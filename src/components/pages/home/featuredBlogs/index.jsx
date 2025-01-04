import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Clock from '@/components/assets/img/Icon awesome-clock.svg';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { Avatar } from '@/components/ui/avatar';
import { fetchFeaturedBlogs } from '@/reduxstore/slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FeaturedBlogs = () => {
  const dispatch = useDispatch();
  const featuredBlogs = useSelector((state) => state.blogs.featuredBlogs);

  useEffect(() => {
    dispatch(fetchFeaturedBlogs());
  }, [dispatch]);

  const renderBlogs = () => {
    return (
      <div className="featuredBlogs-container">
        <div className="featuredBlogs_first">
          <div className="first_img">
            <Image
              src={featuredBlogs[0]?.post_image}
              alt=""
              layout="responsive"
              width={600}
              height={400}
            />
          </div>

          <div className="first_author">
            <Avatar
              avatar={featuredBlogs[0]?.user?.avatar}
              classes="avatar"
            />

            <h3 className="heading-3 first_author_name">
              {featuredBlogs[0]?.user?.name}
            </h3>
          </div>

          <div className="first_text">
            {
              <Link href={`/blog/${featuredBlogs[0]?.id}`}>
                <h3 className="heading-3 first_title">
                  {featuredBlogs[0]?.post_title}
                </h3>
              </Link>
            }

            <p>{featuredBlogs[0]?.short_descp}</p>
          </div>

          <div className="first_date">
            <Image
              src={Clock}
              alt=""
              layout="responsive"
              width={20}
              height={20}
              className="clock"
            />
            {/* <p className="read-time">{featuredBlogs[0].readtime}</p> */}
            <p className="read-date">{featuredBlogs[0]?.created_at} </p>
          </div>
        </div>

        <div className="featuredBlogs_other-blogs">
          {featuredBlogs.slice(1).map((blog) => (
            <div key={blog.id} className="blog_item">
              <div className="blog_item_img">
                <Image
                  src={blog.post_image}
                  alt=""
                  layout="responsive"
                  width={600}
                  height={400}
                />
              </div>

              <div className="blog_item_info">
                <div className="blog_item_author">
                  <Avatar
                    avatar={blog.user?.avatar}
                    classes="avatar"
                  />

                  <h3 className="heading-3 blog_item_name">
                    {blog.user?.name}
                  </h3>
                </div>

                {
                  <Link href={`/blog/${blog.id}`}>
                    <h3 className="heading-3 blog_item_title">
                      {blog.post_title}
                    </h3>
                  </Link>
                }

                <div className="blog_item_date">
                  <Image
                    src={Clock}
                    alt=""
                    layout="responsive"
                    width={20}
                    height={20}
                    className="clock"
                  />
                  <p className="read-date">{blog.created_at} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="featured-blogs">
      <Sectionheading_left_bar heading="Featured" subheading="Blogs" />

      {renderBlogs()}

      <button className="btn btn-primary-grad btn-blogs">
        <Link href="/blogs">View All</Link>
      </button>
    </div>
  );
};
