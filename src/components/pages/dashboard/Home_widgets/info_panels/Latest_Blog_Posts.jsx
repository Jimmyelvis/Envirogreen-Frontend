import React, { useEffect, useState } from 'react'
import { Info_Panel } from './Info_Panel';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux'
import { fetchLatestBlogs } from '@/reduxstore/slices/blogSlice';
import { Avatar } from '@/components/ui/avatar';

export const Latest_Blog_Posts = ({ classname }) => {

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs.latestBlogs)

  useEffect(() => {
    dispatch(fetchLatestBlogs({limit: 4}))
  }, [dispatch])

  return (
    <Info_Panel title="Latest blogs" classname={classname}>
    <div className="info-panel_content">
      <div className="info-panel_list">
        {blogs.map((blog, index) => (
          <div key={index} className="info-panel_list-item">
            <div className="blog-img">
              <Image
                src={blog.post_image}
                alt={blog.post_image}
                width={40}
                height={40}
                layout="responsive"
                className="info-panel-img"
              />
            </div>
            <div className="blog-info">

              <h3 className="heading-3 blog-title">
                {blog.post_title}
              </h3>
              <div className="author-info">
                <Avatar avatar={blog.user_photo_path} />
                <p className="author-name">{blog.user_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Info_Panel>
  )
}
