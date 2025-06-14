import Layout from '@/components/ui/Layout';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { wrapper } from '@/reduxstore/store';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '@/components/ui/Panel';
import { network } from '@/helpers/constants';
import { useRouter } from 'next/router';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { Select } from '@/components/ui/select';
import { BlogCard } from '@/components/ui/cards/blogCard';
import { Pagination } from '@/components/ui/Pagination';
import { debounce } from '@/utils/debounce';
import {
  squareLoader,
  fadingDotsLoader,
  circleLoader,
} from '@/components/ui/Loaders';
import Search_icon from '@/components/assets/img/search-icon.svg';
import {
  setBlogs,
  fetchCategories,
  fetchFeaturedBlogs,
} from '@/reduxstore/slices/blogSlice';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { CategoryPanel } from '@/components/pages/blog/CategoryPanel';

const Blogcategory = () => {
  const router = useRouter();
  const { id } = router.query; // Get category ID from the URL
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.blogs.categories);
  const blogs = useSelector((state) => state.blogs.blogs);

  const { posts, count, message, name } = blogs;

  const getBlogs = () => {
    if (posts) {
      let newPosts = [...posts];

      return newPosts
        .sort((a, b) => a.created_at - b.created_at)
        .map((post) => {
          return <BlogCard post={post} key={post.id} />;
        });
    } else {
      return <div className="loader">{circleLoader}</div>;
    }
  };

  useEffect(() => {
    if (!id) return; // Ensure the ID is present before fetching

    const fetchCategoryBlogs = async () => {
      try {
        const response = await fetch(`${network.api}blogs/categoryposts/${id}`);
        const data = await response.json();
        dispatch(setBlogs(data)); // Update Redux store with new category blogs
      } catch (error) {
        console.error('Error fetching category blogs:', error);
      }
    };

    fetchCategoryBlogs();
  }, [id, dispatch]); // Runs whenever category ID changes

  return (
    <Layout>
      <div className="blogs-pg">
        {posts !== undefined && posts !== null ? (
          <>
            <div className="feature-section">
              {name !== undefined && name !== null && name !== '' ? (
                <Sectionheading_left_bar
                  heading="Writings from our team"
                  subheading={
                    `${name} 
                    Category: ${count} blogs
                    `
                  }
                />
              ) : (
                ''
              )}
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
                <CategoryPanel />
              </div>
            </div>
          </>
        ) : (
          <div className="loading">{fadingDotsLoader()}</div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.params;
    const response = await fetch(`${network.api}blogs/categoryposts/${id}`);
    const data = await response.json();

    console.log('data:', data);

    console.log('called');
    store.dispatch(setBlogs(data));
  }
);

export default Blogcategory;
