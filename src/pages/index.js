import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Hero } from "@/components/pages/home/hero";
import FeaturedListings from "@/components/pages/home/featured";
import { Home_worth } from "@/components/pages/home/home_worth";
import { Communities } from "@/components/pages/home/communities";
import { Testimonials } from "@/components/pages/home/testomonials";
import { FeaturedBlogs } from "@/components/pages/home/featuredBlogs";
import { Newsletter } from "@/components/pages/home/newsletter";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";
import Layout from "@/components/ui/Layout";
import { network } from '@/helpers/constants';


import { wrapper } from '@/reduxstore/store';
import { fetchListings, setListings } from '@/reduxstore/slices/listingSlice';

const Home = () => {


  return (
    <Layout>

      <Hero />
      <FeaturedListings />
      <Home_worth />
      <Communities />
      <Testimonials />
      <FeaturedBlogs />
      <Newsletter />
       
    </Layout>
  );
}


export default Home;