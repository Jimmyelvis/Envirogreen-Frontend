import React, { useState, useEffect } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from '@/reduxstore/slices/userSlice';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { PhotoButton } from '@/components/ui/buttons';
import Link from 'next/link';

const Settings = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <DashLayout>
      <div className="settings-pg">
        <Sectionheading heading="Settings" />

        <div className="btn-group">
          <PhotoButton
            src={`https://res.cloudinary.com/dwgjvssdt/image/upload/v1731178258/buxqit9j560kfjrgra4n.png`}
          >
            <Link href="/admin/settings/Featuredlistings">
              <h3 className="heading-3 bnt-heading">
                Adjust Featured Listings
              </h3>
            </Link>
          </PhotoButton>

          <PhotoButton
            src={`https://res.cloudinary.com/dwgjvssdt/image/upload/v1733594129/misc/jinjoe_httpss.mj.runovK5P2mY6mU_a_mackbook_air_with_code_on_t_87ba0878-538f-4c94-bd25-a22dd033999f_2.png`}
          >
            <Link href="/admin/settings/FeaturedBlogs">
              <h3 className="heading-3 bnt-heading">Adjust Featured Blogs</h3>
            </Link>
          </PhotoButton>

          <PhotoButton
            src={`https://res.cloudinary.com/dwgjvssdt/image/upload/v1733594557/misc/jinjoe_httpss.mj.run50VafVEXB7g_Design_a_clean_and_elegant_ba_1bac7eef-8a68-4c44-9f66-a729c55088c2_3.png`}
          >
            <Link href="/admin/settings/Homepgheader">
              <h3 className="heading-3 bnt-heading">Adjust Home Page Header</h3>
            </Link>
          </PhotoButton>
        </div>
      </div>
    </DashLayout>
  );
};

export default Settings;
