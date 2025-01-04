import React, { useEffect, useState } from 'react'
import { InfoBadge } from './InfoBadge'
import { useDispatch, useSelector } from 'react-redux'
import Blog_icon from '@/components/assets/img/blog-icon-v2.svg'
import { fetchBlogsCount } from '@/reduxstore/slices/blogSlice'


export const Blogs_Badge = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.blogs.count)

  useEffect(() => {
    dispatch(fetchBlogsCount())
  }, [dispatch])

  return (
    <InfoBadge
    title='Blogs'
    value={count ? count : 0}
    icon={Blog_icon}
  />
  )
}
