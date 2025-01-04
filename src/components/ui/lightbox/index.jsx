import React, { useState, useEffect, useRef } from 'react';
import { Panel } from '@/components/ui/Panel';
import Image from 'next/image';
import LeftArrow from '@/components/assets/img/gold-left-arrow.svg';
import RightArrow from '@/components/assets/img/gold-right-arrow.svg';
import LeftGreenArrow from '@/components/assets/img/left-arrow.svg';
import RightGreenArrow from '@/components/assets/img/right-arrow.svg';

export const Lightbox = ({ children, gallery, singleImg }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : gallery.length - 1
    );
    setSelectedImg(gallery[currentIndex - 1]);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < gallery.length - 1 ? prevIndex + 1 : 0
    );
    setSelectedImg(gallery[currentIndex + 1]);
  };

  const scrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: -200, // Adjust based on thumbnail width and gap
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: 200, // Adjust based on thumbnail width and gap
        behavior: 'smooth',
      });
    }
  };

  let images = null;

  if (gallery) {
    images = gallery.map((img, index) => (
      <Image
        key={index}
        src={img}
        alt={`Image ${index}`}
        width={200}
        height={200}
        layout="responsive"
        className="thumbnail-img"
        onClick={() => {
          setSelectedImg(img);
          setCurrentIndex(index);
        }}
      />
    ));
  }

  const renderPanel = () => {
    if (selectedImg) {
      return (
        <Panel className={'light-box-selected-img'}>
          <Image
            src={LeftArrow}
            alt={`left arrow`}
            width={500}
            height={300}
            layout="responsive"
            className="arrow left-arrow"
            onClick={handlePrev}
          />

          <div className="listing-detail_images_mainphoto">
            <Image
              src={selectedImg}
              alt={`Main photo`}
              width={500}
              height={300}
              layout="responsive"
            />
          </div>

          <Image
            src={RightArrow}
            alt={`right arrow`}
            width={500}
            height={300}
            layout="responsive"
            className="arrow right-arrow"
            onClick={handleNext}
          />

          <div className="light-box-single-img_gallery_container">
            <Image
              src={LeftGreenArrow}
              alt={`left arrow`}
              width={500}
              height={300}
              layout="responsive"
              className="arrow left-green-arrow"
              onClick={scrollLeft}
            />

            <div className="gallery-row"  ref={galleryRef}>
              {gallery.map((img, index) => (
                <div
                  key={index}
                  className={
                    index === currentIndex
                      ? 'gallery-item active'
                      : 'gallery-item'
                  }
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    width={200}
                    height={200}
                    layout="responsive"
                    onClick={() => {
                      setSelectedImg(img);
                      setCurrentIndex(index);
                    }}
                  />
                </div>
              ))}

              {/* {images} */}
            </div>

            <Image
              src={RightGreenArrow}
              alt={`right arrow`}
              width={500}
              height={300}
              layout="responsive"
              className="arrow right-green-arrow"
              onClick={scrollRight}
            />
          </div>
        </Panel>
      );
    } else if (singleImg) {
      return (
        <Panel className={'light-box-single-img'}>
          <div className="listing-detail_images_mainphoto">{singleImg}</div>
          {children}
        </Panel>
      );
    } else {
      return (
        <Panel className={'light-box'}>
          <div className="listing-detail_images">{images}</div>
          {children}
        </Panel>
      );
    }
  };

  return <>{renderPanel()}</>;
};
