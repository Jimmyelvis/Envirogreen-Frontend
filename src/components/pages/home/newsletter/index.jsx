import React from 'react';
import Image from 'next/image';
import Envelope from '@/components/assets/img/envelope.svg';
import Send_icon from '@/components/assets/img/send-icon.svg';

export const Newsletter = () => {
  return (
    <div className="news-letter">
      <h3 className="heading-3">Subscribe to our newsletter</h3>

      <div className="subscribe-form">
        <Image
          src={Envelope}
          alt=""
          width={50}
          height={50}
          layout="responsive"
          className="envelope"
        />
        <input type="email" placeholder="Enter your email"  />
        <button className="btn btn-primary-grad btn-subscribe">
          <Image
            src={Send_icon}
            alt=""
            width={50}
            height={50}
            layout="responsive"
            className="send-icon"
          />
        </button>
      </div>
    </div>
  );
};
