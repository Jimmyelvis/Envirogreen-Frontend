import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Location_icon from '@/components/assets/img/location-icon-green.svg';
import Max_price_icon from '@/components/assets/img/max-price.svg';
import Min_price_icon from '@/components/assets/img/min-price.svg';
import Baths_icon from '@/components/assets/img/baths-icon.svg';
import Beds_icon from '@/components/assets/img/beds-icon.svg';
import Building from '@/components/assets/img/building.svg';
import Home_icon from '@/components/assets/img/home-icon.svg';
import Edit_pencil_shadow from '@/components/assets/img/edit-pencil-shadow.svg';
import Trash_can from '@/components/assets/img/trash-can.svg';
import { Panel } from '@/components/ui/Panel';
import {
  deleteuserSave,
  saveSearch,
  updateSaveSearch,
  resetStatus,
} from '@/reduxstore/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { Button } from '@/components/ui/buttons';
import { useRouter } from 'next/router';

export const Saved_Search_Dialog = ({
  searchOptions,
  img,
  savedSearchName,
  searchId,
  // router,
  debouncedRouterPush,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchName, setSearchName] = useState(savedSearchName || '');
  const [editMode, setEditMode] = useState(false);
  const status = useSelector((state) => state.user.status);

  const submitSavedSearch = (e) => {
    e.preventDefault();
    if (searchName !== '') {
      searchOptions.name = searchName;

      if (editMode) {
        dispatch(
          updateSaveSearch({
            id: searchId,
            searchOptions,
          })
        );
      } else {
        dispatch(saveSearch(searchOptions));
      }
    }
  };

  useEffect(() => {
    if (savedSearchName) {
      setEditMode(true);
    }
  }, []);

  useEffect(() => {
    if (status === 'succeeded') {
      console.log('Work man damnnnn');

 

      debouncedRouterPush({
        ...router.query,
        page: 1,
        searchname: searchName,
        searchid: searchId,
      });

      setTimeout(() => {
        dispatch(resetStatus());
      }, 3000);
    }
  }, [status]);

  return (
    <Panel className="saved-search-dialog">
      <div className="content">
        <Sectionheading
          className="saved-search-heading"
          heading="Enter a name for your saved search"
        />

        <input
          type="text"
          className="form-control save-name-input"
          placeholder="Search Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <Button
          classes="btn btn-primary btn-primary-grad submitSearch"
          onClick={(e) => {
            submitSavedSearch(e);
          }}
        >
          Submit
        </Button>
      </div>
    </Panel>
  );
};
