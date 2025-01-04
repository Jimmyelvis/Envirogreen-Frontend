import React, { useEffect, useState } from 'react'
import { InfoBadge } from './InfoBadge'
import Staff_icon from '@/components/assets/img/staff-icon-v2.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllStaff } from '@/reduxstore/slices/staffSlice'

export const Staff_badge = () => {
  const dispatch = useDispatch()
  const staff = useSelector((state) => state.staff.staff)

  useEffect(() => {
    dispatch(fetchAllStaff())
  }, [dispatch])

  return (
    <InfoBadge
      title='Staff'
      value={staff ? staff.count : 0}
      icon={Staff_icon}
    />
  )
}
