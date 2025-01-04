import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Home_hero_img from '@/components/assets/img/house.jpg';
import First_pic from '@/components/assets/img/first-pic.jpg';
import Middle_pic from '@/components/assets/img/middle-pic.jpg';
import Third_pic from '@/components/assets/img/third-pic.jpg';
import { Searchbar } from './Searchbar';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchHomepageSettings,
} from '@/reduxstore/slices/settingsSlice';

export const Hero = () => {

  const dispatch = useDispatch();
  const [url, setUrl] = useState(null);
  const homepageHeader = useSelector((state) => state.settings.homepageHeader);

  useEffect(() => {
    dispatch(fetchHomepageSettings());
  }, [dispatch]);

  useEffect(() => {
    if (homepageHeader) {
      setUrl(homepageHeader);
    }
  }, [homepageHeader]);

  return (
    <div className="frontpg-hero-section">
      <div className="frontpg-hero">
        <div className="left">
          <h2 className="heading-2 picgroup_heading">Let's Bring You Home</h2>
          <p>Finding Dream For Every Owner. We can help, let's find out how</p>

          <div className="smallpicgroup">
            <div className="smallimg-wrapper">
              <Image
                src={First_pic}
                alt="First_pic"
                priority={true}
                className="small-img smallimg-one"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>

            <div className="smallimg-wrapper middleimg-wrapper">
              <Image
                src={Middle_pic}
                alt="Middle_pic"
                priority={true}
                className="small-img smallimg-two"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>

            <div className="smallimg-wrapper">
              <Image
                src={Third_pic}
                alt="Third_pic"
                priority={true}
                className="small-img smallimg-three"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <Image
          src={url || ""}
          alt="home_hero_img"
          fill={true}
          priority={true}
          className="home_hero_img"
        />
      </div>

      <Searchbar />
    </div>
  );
};
