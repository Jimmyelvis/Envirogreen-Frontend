import React, { useEffect, useState } from 'react'
import { InfoBadge } from './InfoBadge'
import States_icon from '@/components/assets/img/states-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStatesWithListings } from '@/reduxstore/slices/listingSlice'

export const States_badge = () => {

  const dispatch = useDispatch()
  const states = useSelector((state) => state.listings.statesWithListings)
  const status = useSelector((state) => state.listings.status)
  const total = useSelector((state) => state.listings.totalNumberOfStatesWithListing)

  useEffect(() => {
    dispatch(fetchStatesWithListings())
  }, [dispatch])


  return (
    <InfoBadge
      title='States Covered'
      value={total ? total : 0}
      icon={States_icon}
    />
  )
}
