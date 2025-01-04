import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Panel } from '@/components/ui/Panel';
import { Button } from '@/components/ui/buttons';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { closeModal } from '@/reduxstore/slices/uiSlice';

export const Success_panel = ({ msg, source }) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.ui.isModalOpen);

  const singleListing = useSelector((state) => state.listings.singleListing);
  const createdListing = useSelector((state) => state.listings.createdListing);
  const singleBlog = useSelector((state) => state.blogs.singleBlog);
  const createdBlog = useSelector((state) => state.blogs.createdBlog);

  let elemId = null;
  let elemRoute = '';
  let elemEditRoute = '';
  let elemLabel = '';
  let createRoute = '';

  if (source === 'listing' && createdListing?.listing) {
    elemId = createdListing.listing.id;
    elemRoute = `/listing/${elemId}`;
    elemEditRoute = `/admin/listings/edit/${elemId}`;
    elemLabel = 'Listing';
    createRoute = `/admin/listings/create`;
  } 
  
  else if (source === 'blog' && createdBlog?.post) {
    elemId = createdBlog.post.id;
    elemRoute = `/blog/${elemId}`;
    elemEditRoute = `/admin/blog/edit/${elemId}`;
    elemLabel = 'Blog';
    createRoute = `/admin/blog/create`;
  }

  else if (source === 'listing' && singleListing?.listing) {
    elemId = singleListing.listing.id;
    elemRoute = `/listing/${elemId}`;
    elemEditRoute = `/admin/listings/edit/${elemId}`;
    elemLabel = 'Listing';
    createRoute = `/admin/listings/create`;
  }

  else if (source === 'blog' && singleBlog) {
    elemId = singleBlog.id;
    elemRoute = `/blog/${elemId}`;
    elemEditRoute = `/admin/blog/edit/${elemId}`;
    elemLabel = 'Blog';
    createRoute = `/admin/blog/create`;
  } 

  return (
    <Panel className="success-panel">
      <Sectionheading heading={msg} />
      <h3 className="heading-3">What would you like to do next?</h3>

      <div className="choices">
        <Button
          classes="btn btn-primary-grad"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          <Link href={createRoute || '#'}>
            Create New {elemLabel || 'Item'}
          </Link>
        </Button>

        {elemId && (
          <>
            <Button
              classes="btn btn-primary-grad"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              <Link href={elemRoute}>
                Go to {elemLabel}
              </Link>
            </Button>

            <Button
              classes="btn btn-primary-grad"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              <Link href={elemEditRoute}>
                Edit Current {elemLabel}
              </Link>
            </Button>
          </>
        )}
      </div>
    </Panel>
  );
};
