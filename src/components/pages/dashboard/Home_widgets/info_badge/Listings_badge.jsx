import React, { useEffect, useState } from 'react';
import { InfoBadge } from './InfoBadge';
import Listing_icon from '@/components/assets/img/price-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListingsCount } from '@/reduxstore/slices/listingSlice';

export const Listings_badge = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.listings.count);

  useEffect(() => {
    dispatch(fetchListingsCount());
  }, [dispatch]);

  return (
    <InfoBadge title="Listings" value={count ? count : 0} icon={Listing_icon} />
  );
};
