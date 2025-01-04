import React from 'react';
import Layout from '@/components/ui/Layout';
import { network } from '@/helpers/constants';
import OurBgImg from '@/components/assets/img/sunny-living-room.jpg';
import PlayBtn from '@/components/assets/img/play-btn.svg';
import { Hero } from '@/components/ui/hero';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import Image from 'next/image';

const Background = () => {

  /**
   * Todo: Create a Modal component that will display a video when the play button is clicked
   */


  return (
    <Layout>
      <Hero
        heading={'Background'}
        subHeading={'Our team is made up of the best in the business'}
        img={OurBgImg}
        classes="staff-hero"
      />
      <div className="our-bg">
        <div className="who-we-are">
          <div className="who-we-are_left">
            <h2 className="heading-2">Who We Are</h2>
            <p>
              Our team is made up of the best in the business. We have a
              combined experience of over 100 years in the real estate industry.
              We have a passion for helping people find the perfect home and we
              are dedicated to providing the best service possible.
            </p>
          </div>

          <div className="who-we-are_right">
            <Image
              src={PlayBtn}
              alt="play btn"
              width={400}
              height={400}
              layout="responsive"
              className="play-btn"
            />
            <div className="overlay"></div>
            <Image
              src={OurBgImg}
              alt="Our Background"
              width={400}
              height={400}
              layout="responsive"
              className="our-bg-img"
            />
          </div>
        </div>

        <div className="our-founders">
          <Sectionheading_left_bar
            heading="Our Founders"
            subheading="Meet our Leaders"
          />

          <div className="founders">
            <div className="founder">
              <Image
                src={`${network.staffphoto}sam.jpg`}
                alt="founder1"
                width={400}
                height={400}
                layout="responsive"
                className="founder-img"
              />
              <h3 className="heading-3">Sam Kerrigan</h3>
              <p>CEO</p>
            </div>

            <div className="founder">
              <Image
                src={`${network.staffphoto}luger.jpg`}
                alt="founder2"
                width={400}
                height={400}
                layout="responsive"
                className="founder-img"
              />
              <h3 className="heading-3">Mike Luger</h3>
              <p>COO</p>
            </div>
          </div>
        </div>

        <div className="selling-point">
          <div className="selling-point_info">
            <h3 className="heading-3">We have listed over 300 Properties.</h3>

            <button
              className="btn btn-primary btn-primary-grad"
            >
              Contact Us
            </button>
          </div>

          <div className="overlay"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Background;
