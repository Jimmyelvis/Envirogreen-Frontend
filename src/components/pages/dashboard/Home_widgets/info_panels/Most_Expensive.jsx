import React, { useEffect, useState } from 'react'
import { Info_Panel } from './Info_Panel'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExpensiveListings } from '@/reduxstore/slices/listingSlice'
import { formatPrice } from '@/utils/formatInfo';
import Image from 'next/image'
import { Avatar } from '@/components/ui/avatar';
import { imgsrc } from '@/utils/getImgsrc';


export const Most_Expensive = ({
  classname
}) => {

  // const listings = [
  //   {
  //     address: '123 Main St',
  //     city: 'Springfield',
  //     state_abbrev: 'MA',
  //     price: 500000,
  //     mainImg: 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1728758409/x59holjylnzyg3vwtuvq.jpg',
  //   },
  //   {
  //     address: '456 Elm St',
  //     city: 'Hartford',
  //     state_abbrev: 'CT',
  //     price: 600000,
  //     mainImg: 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1728147187/bmfw8parl1vzkisanvc9.jpg',
  //   },
  //   {
  //     address: '789 Oak St',
  //     city: 'Providence',
  //     state_abbrev: 'RI',
  //     price: 700000,
  //     mainImg: 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1711309978/hlaqrothrdhhbg7a7h84.jpg',
  //   },
  
  // ]

  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings.expensiveListings)

  useEffect(() => {
    dispatch(fetchExpensiveListings({limit: 3, sort: 'desc', sort_by: 'price'}))
  }, [dispatch])

  return (
    <Info_Panel
    title='Most Expensive Listings'
    classname={classname}
  >
    <div className="img-holder">
      <Image 
        src='https://res.cloudinary.com/dwgjvssdt/image/upload/v1728758432/a9txywgekptdtymmfnyc.jpg' 
        alt='Cities with most listings'
        width={40}
        height={40}
        layout="responsive"
        className='info-panel-img'
      />
    </div>

    <div className="info-panel_content">
      <ul className="info-panel_list">
        {
          listings.map((listing, index) => (
            <li key={index} className="info-panel_list-item">
              <div className="listing-img">
                <Image
                  src={imgsrc(listing)}
                  alt="listing"
                  width={40}
                  height={40}
                  layout="responsive"
                  className="info-panel-img"
                />
              </div>

              <div className="details">

                <h3 className="heading-3 street">
                  {listing.street}
                </h3>

                <h3 className="heading-3 city-state">
                  {listing.city_name}, {listing.state_abbrev}
                </h3>

                <p className="price">
                {formatPrice(listing.price)}
                </p>
 
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  </Info_Panel>
  )
}
