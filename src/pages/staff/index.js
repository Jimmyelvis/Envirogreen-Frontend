import React from 'react';
import Link from 'next/link';
import Layout from '@/components/ui/Layout';
import { network } from '@/helpers/constants';
import { setAllStaff } from '@/reduxstore/slices/staffSlice';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@/reduxstore/store';
import { ProfileCard } from '@/components/ui/cards/profileCard';
import StaffheaderImg from '@/components/assets/img/header-imgs/staff.jpg';
import { Hero } from '@/components/ui/hero';

const Staff = () => {
  const dispatch = useDispatch();
  const staff = useSelector((state) => state.staff.staff);

  const filterStaff = () => {
    const filteredStaff = staff.filter((member) => member.role_id !== 3);

    return filteredStaff.map((member) => (
      <ProfileCard key={member.id} profile={member} />
    ));
  };

  return (
    <Layout>
      <Hero
        heading="Our Team"
        subHeading="Meet the people who make it all happen"
        img={StaffheaderImg}
        classes="staff-hero"
      />

      <div className="staff-members">{filterStaff()}</div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      try {
        const response = await fetch(`${network.api}staff`);
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        console.log('data:', data); // Log data to check the structure and contents
        store.dispatch(setAllStaff(data.staff)); // Assuming data.staff contains the array of staff members
      } catch (error) {
        console.error('Failed to fetch staff:', error);
        return {
          props: { error: error.message },
        };
      }
      return {
        props: {},
      };
    }
);

export default Staff;
