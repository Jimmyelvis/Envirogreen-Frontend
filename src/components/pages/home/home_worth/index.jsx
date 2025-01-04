/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image';
import BgImg from '@/components/assets/img/sub-home.jpg'
import LeafIcon from '@/components/assets/img/leaf.svg'
import RightSideBg from '@/components/assets/img/living-room.jpg'
import { Panel } from '@/components/ui/Panel';

export const Home_worth = () => {
  return (
    <div className='home-worth'>
      
      <div className="home-worth_container">

        <Panel className="home-worth_content">

          <Image src={LeafIcon} alt="" width={300}  layout={'responsive'} className='leafIcon' />

          <p className="home-worth_content_subheading">
            What is your
          </p>

          <h3 className="heading-3 home-worth_content_heading">
            Home Worth?
          </h3>

          <p className="home-worth_content_text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore doloribus autem aliquid molestiae! Officia, quis aut maiores itaque molestias 
          </p>

          <button className="btn btn-primary-grad home-worth_content_btn_contact">
            Get Started
          </button>

        </Panel>

          <div className="home-worth_right-bg">

            <Image 
              src={RightSideBg} 
              alt="" className='home-worth_right-bg_img' 
              width={600}
              layout='responsive'
            />
          </div>

        <div className="overlay"></div>
        <Image src={BgImg} alt="" className='img-bg'  fill={true} />
      </div>
    </div>
  )
}
