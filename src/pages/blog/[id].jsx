import Layout from '@/components/ui/Layout';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { wrapper } from '@/reduxstore/store';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '@/components/ui/Panel';
import { network } from '@/helpers/constants';
import { setBlog, fetchCategories } from '@/reduxstore/slices/blogSlice';
import { Avatar } from '@/components/ui/avatar';
import Facebook_icon from '@/components/assets/img/facebook-icon.svg';
import Twitter_icon from '@/components/assets/img/twitter-icon.svg';
import Email_icon from '@/components/assets/img/email-icon.svg';
import Phone_icon from '@/components/assets/img/phone-icon.svg';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import renderHTML from "react-render-html";
import { FadeUp } from '@/utils/animation/framer/FadeUp';
import parse, { domToReact } from 'html-react-parser';


const Blog = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.blogs.singleBlog);
  const categories = useSelector((state) => state.blogs.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Layout>
      <div className="single-blog">
        <div className="single-blog_header">
          <Image
            src={post?.post_image}
            alt="Post Image"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>

        <div className="single-blog_content">
          <div className="single-blog_content-body">
            <h2 className="heading-2 post-title">{post?.post_title}</h2>

            <p className="short-desc">{post?.short_descp}</p>

            {/* <div
              className="post-content"
              // dangerouslySetInnerHTML={{ __html: post?.long_descp }}
            >
              <FadeUp
                delay={0.25}
                duration={0.5}
              >

                {renderHTML(post?.long_descp)}

                {
                  console.log("long dsc",post?.long_descp)
                }
              </FadeUp>
            </div> */}

            <div className="post-content">
              {parse(post?.long_descp, {
                replace: (domNode) => {
                  if (domNode.name === 'p') {
                    // Use domToReact to convert children nodes back to React elements
                    return (
                      <FadeUp 
                        delay={0.25} 
                        duration={1}
                        classNames="mb-8"
                      >
                        {domToReact(domNode.children)}
                      </FadeUp>
                    );
                  }
                },
              })}
            </div>

          </div>

          <div className="single-blog_content-details">
            <Panel className="single-blog_content-details_author">
              <Avatar avatar={post?.user_photo_path} />
              <h3 className="heading-3 author-name">{post?.user_name}</h3>

              <ul className="socials">
                <li>
                  {post?.user?.facebook && (
                    <Image
                      src={Facebook_icon}
                      alt=""
                      width={500}
                      height={500}
                      layout="responsive"
                    />
                  )}
                </li>

                <li>
                  {post?.user?.twitter && (
                    <Image
                      src={Twitter_icon}
                      alt=""
                      width={500}
                      height={500}
                      layout="responsive"
                    />
                  )}
                </li>

                <li>
                  {post?.user?.email && (
                    <Image
                      src={Email_icon}
                      alt=""
                      width={500}
                      height={500}
                      layout="responsive"
                    />
                  )}
                </li>

                <li>
                  {post?.user?.phone && (
                    <Image
                      src={Phone_icon}
                      alt=""
                      width={500}
                      height={500}
                      layout="responsive"
                    />
                  )}
                </li>
              </ul>
            </Panel>

            <Panel className="categories-panel">
            <Sectionheading heading="Categories" />


              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/blogs/${category.id}`}>
                    {category.category_name}
                  </Link>

                  <p className="count">
                    {category.blog_posts_count}
                    {category.blog_posts_count === 1 ? ' post' : ' posts'}
                  </p>
                </li>
              ))}
            </Panel>

            <Panel className="tags-panel">
              <Sectionheading heading="Tags" />

              <div className="tags">
                {post?.post_tags.split(',').map((tag, index) => (
                  <li key={index} className="btn-primary-grad tag">
                    {tag}
                  </li>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.params; // Extract the id from URL parameters

    try {
      const response = await fetch(`${network.api}blogs/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      store.dispatch(setBlog(data));
    } catch (error) {
      console.error('Error fetching blog:', error);
    }

    return {
      props: {},
    };
  }
);

export default Blog;
