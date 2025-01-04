import React, { useState, useEffect } from 'react';
import { network } from '@/helpers/constants';
import {
  fetchStaff,
  fetchRoles,
  changeRole,
} from '@/reduxstore/slices/staffSlice';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { ListingCard } from '@/components/ui/cards/listingCard';
import { useRouter } from 'next/router';
import Facebook_icon from '@/components/assets/img/facebook-icon.svg';
import Twitter_icon from '@/components/assets/img/twitter-icon.svg';
import Email_icon from '@/components/assets/img/email-icon.svg';
import Phone_icon from '@/components/assets/img/phone-icon.svg';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { squareLoader, fadingDotsLoader } from '@/components/ui/Loaders';
import Image from 'next/image';
import { SelectListGroup } from '@/components/ui/form/SelectListGroup'
import User_Icon from '@/components/assets/img/user-icon-green.svg';
import { Button } from '@/components/ui/buttons';

const Admin_Staff_Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector((state) => state.staff.staffProfile);
  const { roles } = useSelector((state) => state.staff.roles);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState(null);
  const listingsPerPage = 6;

  // Calculate the indices for slicing the listings array
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = user?.listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  const totalPages = Math.ceil(user?.listings.length / listingsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchStaff(id));
    dispatch(fetchRoles());
  }, [id]);

  useEffect(() => {
    if (user) {
      setRole(user.role_id);
    }
  }, [user]);

  if (!user) {
    return <div className="loading">{fadingDotsLoader()}</div>;
  }


  return (
    <DashLayout>
      <div className="admin-staff-detail">
        <div className="admin-staff-detail_left">
          <Image
            src={`${network.img}${user.photo_path}`}
            alt={user.name}
            width={500}
            height={500}
            layout="responsive"
            className="admin-staff-detail_photo"
          />
        </div>

        <div className="admin-staff-detail_right">
          <div className="user-name_role">
            <h1 className="heading-1 admin-staff-detail_username">
              {user.name}
            </h1>
            <h2 className="heading-2 admin-staff-detail_role">
              {user.role_name}
            </h2>
          </div>

          <p className="admin-staff-detail_bio">{user.bio}</p>

          <ul className="admin-staff-detail_socials">
            <li>
              {user.facebook && (
                <a href={`facebook.com/${user.facebook}`}>
                  <Image
                    src={Facebook_icon}
                    alt=""
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                  {user.facebook}
                </a>
              )}
            </li>

            <li>
              {user.twitter && (
                <a href={`twitter.com/${user.twitter}`}>
                  <Image
                    src={Twitter_icon}
                    alt=""
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                  {user.twitter}
                </a>
              )}
            </li>

            <li>
              {user.email && (
                <a href={`mailto:${user.email}`}>
                  <Image
                    src={Email_icon}
                    alt=""
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                  {user.email}
                </a>
              )}
            </li>

            <li>
              {user.phone && (
                <a href={`tel:${user.phone}`}>
                  <Image
                    src={Phone_icon}
                    alt=""
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                  {user.phone}
                </a>
              )}
            </li>
          </ul>

          <div className="roles">
            <SelectListGroup
              placeholder="Select Role"
              options={
                roles.map((role) => ({ 
                  label: role.name ,
                  value: role.id, 
                  selected: role.id === user.role_id
                }))
              }
              onChange={(e) => {
                // parse the value to an integer
                const role = parseInt(e.target.value);
                setRole(role);
              }}
              name="roles"
              value={role}
              extraClasses={'roles-select'}
              icon={User_Icon}
            />

            <Button
              type="button"
              classes="btn-primary-grad btn-change-role"
              onClick={() => {
                dispatch(changeRole({ userId: user.id, roleId: role }));
                console.log('Change role');
              }}
            >
              Submit
            </Button>
          </div>
        </div>

        {user?.listings.length > 0 && (
          <div className="admin-staff-detail_listings">
            <Sectionheading_left_bar
              heading={user.name + "'s"}
              subheading="Listings"
            />

            <div className="user_listings">
              {currentListings?.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-button ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="admin-staff-detail_contact">
          <h3 className="heading-3">Contact {user.name}</h3>

          <form>
            <input type="text" placeholder="Name" className="form-control" />
            <input type="email" placeholder="Email" className="form-control" />
            <input type="tel" placeholder="Phone" className="form-control" />
            <input type="text" placeholder="Subject" className="form-control" />

            <textarea
              placeholder="Message"
              className="form-control text-area"
              rows={15}
            ></textarea>
            <button className="btn btn-primary-grad btn-contact">Send</button>
          </form>
        </div>
      </div>
    </DashLayout>
  );
};

export default Admin_Staff_Detail;
