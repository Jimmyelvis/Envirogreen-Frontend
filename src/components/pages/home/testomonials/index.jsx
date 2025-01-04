import React, {useState, useEffect } from 'react';
import Image from 'next/image';
import Leftimg from '@/components/assets/img/testimonials/pexels-pixabay-260046.jpg';
import Rightimg from '@/components/assets/img/testimonials/pexels-pixabay-275484.jpg';
import TestimonialImg from '@/components/assets/img/testimonials/pexels-heyho-6077368.jpg';
import Quote_icon from '@/components/assets/img/icon-quote.svg';
import Left_arrow from '@/components/assets/img/left-arrow.svg';
import Right_arrow from '@/components/assets/img/right-arrow.svg';
import Test_logo from '@/components/assets/img/testimonials/test-logo.svg';
import Bedroom from '@/components/assets/img/bedroom.jpg';
import Dot_active from '@/components/assets/img/dot-active.svg';
import Dot_inactive from '@/components/assets/img/dot-inactive.svg';
import { Avatar } from '@/components/ui/avatar';
import { testimonialsData } from './testimonialsData';

export const Testimonials = () => {

   // State to keep track of the current slide
   const [currentSlide, setCurrentSlide] = useState(0);

   // Update the component to handle slide direction
  const [prevSlide, setPrevSlide] = useState(0);

     // Function to handle pagination dot click
  const handleDotClick = (index) => {
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
  };


  return (
    <div className="testimonials">

      <div className="testimonials_container">

        <div className="left">
          <div className="lrg-photo">
            <Image
              src={Bedroom}
              alt=""
              className="left-bg-img"
              layout="responsive"
              width={600}
              height={400}
            />
          </div>
        </div>
        <div className="right">
          <div className="headines">
            <h2 className="heading-2 main-heading">
              Find the best property for you
            </h2>
            <p className="subheadline">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et
            </p>
          </div>
          <div className="slider">
            <div className="quote-icon">
              <Image src={Quote_icon} alt="" width={33} layout="responsive" />
            </div>
            
            <div className="slider-content">
              {/* Map over testimonials and display the current slide */}
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`slider-content-item ${
                    index === currentSlide ? 'active' : 'inactive'
                  }`}
                >
                  <h3 className="heading-3 slider-content-item_title">
                    {testimonial.title}
                  </h3>
                  <p className="slider-content-item_text">
                    {testimonial.text}
                  </p>
                  <div className="from">
                    {/* <Avatar staticImg={testimonial.avatar} /> */}
                    <div className="from-text">
                      <h4 className="heading-4">{testimonial.name}</h4>
                      <p>{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}

                 {/* Pagination Dots */}
                 <ul className="slider-pagination">
                {testimonialsData.map((_, index) => (
                  <li
                    key={index}
                    className="pagination-item"
                    onClick={() => handleDotClick(index)}
                  >
                    <Image
                      src={index === currentSlide ? Dot_active : Dot_inactive}
                      alt=""
                      width={33}
                      layout="responsive"
                    />
                  </li>
                ))}
              </ul>
          </div>
        </div>

      </div>

    </div>

  </div>
  );
};
