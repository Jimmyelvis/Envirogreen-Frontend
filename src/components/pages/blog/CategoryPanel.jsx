import { Sectionheading } from '@/components/ui/headings/Sectionheading'
import { Panel } from '@/components/ui/Panel'
import Link from 'next/link'
import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
} from '@/reduxstore/slices/blogSlice';

export const CategoryPanel = (
) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.blogs.categories);


    useEffect(() => {
      dispatch(fetchCategories());
    }, [dispatch]);

  const getCategories = () => {
    if (categories) {

      const activeCategories = categories.filter((category) => category.blog_posts_count > 0);

      return activeCategories.map((category) => (
        <li key={category.id}>
          <Link href={`/blogs/category/${category.id}`}>{category.category_name}</Link>

          <p className="count">
            {category.blog_posts_count}
            {category.blog_posts_count === 1 ? ' post' : ' posts'}
          </p>
        </li>
      ));
    }
  };

  return (
    <Panel className="categories-panel">
    <Sectionheading heading="Categories" />

    {
      getCategories()
    }
  </Panel>
  )
}
