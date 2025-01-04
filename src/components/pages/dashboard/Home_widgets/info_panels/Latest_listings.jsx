import React, { useEffect, useState } from 'react'
import { Info_Panel } from './Info_Panel';
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image';
import { Avatar } from '@/components/ui/avatar';
import { fetchLatestListings } from '@/reduxstore/slices/listingSlice';
import { formatPrice } from '@/utils/formatInfo';

export const Latest_listings = ({ classname }) => {

  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings.latestListings)
  

  useEffect(() => {
    dispatch(fetchLatestListings({limit: 3}))
  }, [dispatch])

  return (
    <Info_Panel title="Latest listings" classname={classname}>
      <div className="info-panel_content">
        <div className="info-panel_list">
          {listings.map((listing, index) => (
            <div key={index} className="info-panel_list-item">
              <div className="listing-img">
                <Image
                  src={listing.main_photo}
                  alt={listing.main_photo}
                  width={40}
                  height={40}
                  layout="responsive"
                  className="info-panel-img"
                />
              </div>
              <div className="listing-info">

                <div className="address">
                  <p className="listing-street">{listing.street}</p>
                  <p className="listing-city-state">
                    {listing.city_name}, 
                    {listing.state_abbrev}
                  </p>
                  <p className="listing-price">
                    {formatPrice(listing.price)}
                  </p>
                </div>

                <div className="agent-info">
                  <Avatar 
                    avatar={listing.user_photo_path} 
                  />
                  <p className="agent-name">{listing.user?.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Info_Panel>
  );
};
