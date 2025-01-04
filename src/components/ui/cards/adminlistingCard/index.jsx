import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { network } from '@/helpers/constants';
import { useRouter } from 'next/router';
import { Panel } from '@/components/ui/Panel';
import Area_icon from '@/components/assets/img/area-icon.svg';
import Sq_Ruler from '@/components/assets/img/sq-green-ruler.svg';
import Ruler from '@/components/assets/img/green-ruler.svg';
import Bed_icon from '@/components/assets/img/bed-icon.svg';
import Bath_icon from '@/components/assets/img/baths-icon.svg';
import { Avatar } from '../../avatar';
import Listing from '../../../../pages/listing/[id]';
import FaceBook from '@/components/assets/img/facebook-icon.svg';
import Twitter from '@/components/assets/img/twitter-icon.svg';
import Email from '@/components/assets/img/email-icon.svg';
import Phone from '@/components/assets/img/phone-icon.svg';
import Icon_view from '@/components/assets/img/icon-view.svg';
import Icon_edit from '@/components/assets/img/icon-edit.svg';
import { imgsrc, parseExtraPhotos } from '@/utils/getImgsrc';
import { formatPrice } from '@/utils/formatInfo';

export const Admin_ListingCard = ({ listing }) => {
  /*
    A Listing may have have an older version of the extra photos array
    where each extra photo is stored in a separate field. This function
    checks if the listing has the new array format and returns the extra
    photos in the new format. If the listing has the old format, it returns the extra photos in the old format.
  */
  const getExtraPhotos = () => {

    let extraPhotos = parseExtraPhotos(listing);

    let limit = 3;

    return (
      <>
        <ul>
          {extraPhotos.slice(0, limit).map((photo, index) => {
            // const src =
            //   listing.extraphotos !== null ? photo : `${network.img}/${photo}`;
            return (
              <Image
                key={index}
                src={photo}
                alt={`Extra photo ${index + 1}`}
                width={500}
                height={300}
                layout="responsive"
              />
            );
          })}
          {
            // Display the number of extra photos not shown
            extraPhotos.length > 0 && extraPhotos.length >= limit ? (
              <p className="extra-photos">
                +  {extraPhotos.length - limit} 
              </p>
            ) : null
          }
        </ul>
      </>
    );
  };

  return (
    <div className="listingCard">
      <Panel className="listingCard-front">
        <div className="listingCard-front_img">
          <Image
            src={
              imgsrc(listing)
            }
            alt=""
            width={500}
            height={300}
            layout="responsive"
          />

          <div className="street-price">
            <h3 className="heading-3 street">{listing.street}</h3>

           
          </div>
        </div>
        <div className="listingCard-front_details">
          <h3 className="heading-3 location">
            {listing.city_name}, {listing.state_name}
          </h3>

          <h4 className="heading-4 price">{formatPrice(listing.price)}</h4>


          <ul className="property-info">
            <li>
              <h4 className="heading-4 bottom_label">Beds</h4>
              <Image
                src={Bed_icon}
                alt="Ruler"
                width={20}
                height={20}
                layout="responsive"
                className="icon bed-icon"
              />
              <p className="bottom_value">{listing.beds}</p>
            </li>

            <li>
              <h4 className="heading-4 bottom_label">Baths</h4>
              <Image
                src={Bath_icon}
                alt="Ruler"
                width={20}
                height={20}
                layout="responsive"
                className="icon bath-icon"
              />
              <p className="bottom_value">{listing.baths}</p>
            </li>

            <li>
              <h4 className="heading-4 bottom_label">Sqft</h4>
              <Image
                src={Ruler}
                alt="Ruler"
                width={20}
                height={20}
                layout="responsive"
                className="icon sqft-icon"
              />
              <p className="bottom_value">{listing.sqft}</p>
            </li>
          </ul>
        </div>
      </Panel>

      <div className="listingCard-back listingCard-admin">

        <div className="icons">

          <Link href={`/listing/${listing.id}`}>
              <Image
                src={Icon_view}
                alt="View"
                width={30}
                height={30}
                layout="responsive"
                className='icon view-icon'
              />

              <h3 className="heading-3">
                View Listing
              </h3>
          </Link>

          <Link href={`/admin/listings/edit/${listing.id}`}>
              <Image
                src={Icon_edit}
                alt="Edit"
                width={30}
                height={30}
                layout="responsive"
                className='icon edit-icon'
              />

              <h3 className="heading-3">
                Edit Listing
              </h3>
          </Link>
        </div>
        
        <div className="overlay"></div>
        <Image
          src={
            listing.fullpic_path
              ? `${network.img}${listing.fullpic_path}`
              : listing.main_photo
          }
          alt=""
          width={500}
          height={300}
          layout="responsive"
          className="listingCard-back_img"
        />
      </div>     
    </div>
  );
};
