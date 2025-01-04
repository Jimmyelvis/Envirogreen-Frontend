import React, { useState } from 'react';
import { network } from '@/helpers/constants';
import { wrapper } from '@/reduxstore/store';
import { setStaffProfile, setStaffuser } from '@/reduxstore/slices/staffSlice';
import Layout from '@/components/ui/Layout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ListingCard } from '@/components/ui/cards/listingCard';
import Facebook_icon from '@/components/assets/img/facebook-icon.svg';
import Twitter_icon from '@/components/assets/img/twitter-icon.svg';
import Email_icon from '@/components/assets/img/email-icon.svg';
import Phone_icon from '@/components/assets/img/phone-icon.svg';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';

export const StaffDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector((state) => state.staff.staffProfile);

  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 4;

  if (!user) {
    return <div>Loading...</div>;
  }

   // Calculate the indices for slicing the listings array
   const indexOfLastListing = currentPage * listingsPerPage;
   const indexOfFirstListing = indexOfLastListing - listingsPerPage;
   const currentListings = user.listings.slice(indexOfFirstListing, indexOfLastListing);
   const totalPages = Math.ceil(user.listings.length / listingsPerPage);
 
   const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <Layout>
      <div className="staff-detail">
        <div className="staff-detail_left">
          <Image
            src={`${network.img}${user.photo_path}`}
            alt={user.name}
            width={500}
            height={500}
            layout="responsive"
            className="staff-detail_photo"
          />
        </div>

        <div className="staff-detail_right">

          <div className="user-name_role">
            <h1 className="heading-1 staff-detail_username">{user.name}</h1>
            <h2 className="heading-2 staff-detail_role">{user.role_name}</h2>
          </div>

          <p className="staff-detail_bio">{user.bio}</p>

          <ul className="staff-detail_socials">
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
        </div>

        {user?.listings.length > 0 && (
          <div className="staff-detail_listings">
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
                  className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="staff-detail_contact">
          
          <h3 className="heading-3">
            Contact {user.name}
          </h3>

            <form>
              <input 
                type="text" 
                placeholder="Name" 
                className='form-control'  
              />
              <input 
                type="email" 
                placeholder="Email" 
                className='form-control' 
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                className='form-control'
              />
              <input 
                type="text" 
                placeholder="Subject" 
                className='form-control' 
              />

              <textarea 
                placeholder="Message"
                className='form-control text-area'
                rows={15}
              >  
              </textarea>
              <button className="btn btn-primary-grad btn-contact">Send</button>
            </form>
         
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      try {
        const response = await fetch(`${network.api}staff/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        store.dispatch(setStaffProfile(data)); // Dispatching the action to set the staff user
      } catch (error) {
        console.error('Failed to fetch staff details:', error);
        return {
          props: { error: error.message },
        };
      }
      return {
        props: {},
      };
    }
);

export default StaffDetail;
