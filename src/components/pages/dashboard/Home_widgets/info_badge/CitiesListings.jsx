import React, { useEffect, useState } from 'react'
import { InfoBadge } from './InfoBadge'
import Building_icon from '@/components/assets/img/building-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCitiesWithListings } from '@/reduxstore/slices/listingSlice'

export const CitiesListings = () => {

  const dispatch = useDispatch()
  const cities = useSelector((state) => state.listings.citiesWithListings)
  const status = useSelector((state) => state.listings.status)
  const total = useSelector((state) => state.listings.totalNumberOfCitiesWithListing)

  useEffect(() => {
    dispatch(fetchCitiesWithListings())
  }, [dispatch])


  return (
    <InfoBadge
      title='Cities with listings'
      value={total ? total : 0}
      icon={Building_icon}
    />
  )
}
