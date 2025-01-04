import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { network } from '@/helpers/constants';
import { wrapper } from '@/reduxstore/store';
import { fetchFeaturedListings } from '@/reduxstore/slices/listingSlice';
import Image from 'next/image';
import { ListingCard } from '@/components/ui/cards/listingCard';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { fadingDotsLoader } from '@/components/ui/Loaders';

const FeaturedListings = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.featuredListings);
  const status = useSelector((state) => state.listings.status);

  useEffect(() => {
    dispatch(fetchFeaturedListings());
  }, [dispatch]);

  const getListings = (params) => {
    if (listings && listings.length > 0) {
      const sortedListings = [...listings]
        .sort((a, b) => {
          return a.featured - b.featured;
        })
        .slice(0, 3)
        .map((listing) => (
          <li>
            <ListingCard key={listing.id} listing={listing} />
          </li>
        ));

      return sortedListings;
    }
  };

  return (
    <div className="featured_listings">
      {status === 'loading' && (
        <div className="loader">{fadingDotsLoader()}</div>
      )}

      <Sectionheading_left_bar heading="Featured" subheading="Listings" />

      {<ul>{getListings()}</ul>}
    </div>
  );
};

export default FeaturedListings;
