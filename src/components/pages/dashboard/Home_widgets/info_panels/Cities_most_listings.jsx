import React, { useEffect, useState } from 'react'
import { Info_Panel } from './Info_Panel'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMostCitiesWithListings } from '@/reduxstore/slices/listingSlice'


export const Cities_most_listings = ({
  classname
}) => {

  const dispatch = useDispatch()
  const cities = useSelector((state) => state.listings.mostCitiesWithListings)

  useEffect(() => {
    dispatch(fetchMostCitiesWithListings())
  }, [dispatch])


  return (
    <Info_Panel
      title='Cities with most listings'
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
          {cities.map((city, index) => (
            <li key={index} className="info-panel_list-item">
              <p className='city-state'>
                {city.city_name}, {city.state_abbrev}</p>
              <p className='listings-value'>
                {city.total}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Info_Panel>
  )
}
