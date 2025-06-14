import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import Layout from '@/components/ui/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBlogs,
  fetchCategories,
  fetchFeaturedBlogs,
} from '@/reduxstore/slices/blogSlice';
import { wrapper } from '@/reduxstore/store';
import { network } from '@/helpers/constants';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { Select } from '@/components/ui/select';
import { useRouter } from 'next/router';
import { BlogCard } from '@/components/ui/cards/blogCard';
import { Pagination } from '@/components/ui/Pagination';
import { debounce } from '@/utils/debounce';
import { Panel } from '@/components/ui/Panel';
import {
  squareLoader,
  fadingDotsLoader,
  circleLoader,
} from '@/components/ui/Loaders';
import Search_icon from '@/components/assets/img/search-icon.svg';
import { CategoryPanel } from '@/components/pages/blog/CategoryPanel';

const Blogs = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs.blogs);
  const featuredBlogs = useSelector((state) => state.blogs.featuredBlogs);
  const categories = useSelector((state) => state.blogs.categories);

  const { data, count, message, current_page, last_page, per_page } = blogs;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFeaturedBlogs());
  }, [dispatch]);

  const getFeatured = () => {
    const featuredPosts = featuredBlogs
      .filter((post) => post.featured > 0)
      .sort((a, b) => a.featured - b.featured);

    return (
      <div className="featured-posts">
        {featuredPosts.map((post) =>
          post.featured === 1 ? (
            <div className="featured-posts-first" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : post.featured === 2 ? (
            <div className="featured-posts-second" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : post.featured === 3 ? (
            <div className="featured-posts-third" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : post.featured === 4 ? (
            <div className="featured-posts-fourth" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : post.featured === 5 ? (
            <div className="featured-posts-fifth" key={post.id}>
              <BlogCard post={post} key={post.id} />
            </div>
          ) : null
        )}
      </div>
    );
  };

  const getBlogs = () => {
    if (data) {
      return data
        .filter((post) => post.featured === 0)
        .sort((a, b) => a.created_at - b.created_at)
        .map((post) => <BlogCard post={post} key={post.id} />);
    }
  };

  return (
    <Layout>
      <div className="blogs-pg">

        {data !== undefined && data !== null && data.length > 0 ? (
          <>
            <div className="feature-section">
              <Sectionheading_left_bar
                heading="Writings from our team"
                subheading="The latest industry news, and resources"
              />

              { getFeatured() }
            </div>

            <div className="blogs-section">
              {/* <TextFieldGroup
                placeholder="Search Blogs"
                name="search"
                value=""
                // onChange={() => {}}
                icon={Search_icon}
                iconPosition="right"
                classes={'search-input'}
              /> */}

              <div className="blogs">{getBlogs()}</div>

              <div className="filters">
                <CategoryPanel categories={categories} />
              </div>
            </div>
          </>
        ) : (
          <div className="loading">
            {fadingDotsLoader()}
          </div>
        )}
   
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    // store.dispatch(setBlogs({ data: [], count: 0 }));
    const response = await fetch(`${network.api}blogs`);
    const data = await response.json();

    console.log('data: from blogs js', data);

    store.dispatch(setBlogs(data));
    console.log('called inside Blogs.js');
  }
);

export default Blogs;
