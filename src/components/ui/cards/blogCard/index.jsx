import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'


export const BlogCard = ({
  post,
  admin
}) => {

  const link = admin ? `/admin/blog/edit/${post?.id}` : `/blog/${post?.id}`

  return (
    <div key={post?.id} className="blog-card">
    <div className="blog-card_author">
      <Avatar avatar={post?.user?.avatar} />

      <h3 className="heading-3 author-name">{post?.user_name}</h3>
    </div>

    <div className="blog-card_info">
      <h3 className="heading-3 blog-title">
        <Link href={link}>
          {post?.post_title}
        </Link>
      </h3>

      <p className="short-desc">{post?.short_descp}</p>
    </div>

    <div className="overlay"></div>
    <Image
      src={post?.post_image}
      alt={post?.post_title}
      width={100}
      height={100}
      layout="responsive"
      className="blog-image"
    />
  </div>
  )
}
