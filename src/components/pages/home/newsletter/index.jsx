import React, { useState } from 'react';
import Image from 'next/image';
import Envelope from '@/components/assets/img/envelope.svg';
import Send_icon from '@/components/assets/img/send-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { submitNewsLetter } from '@/reduxstore/slices/newsLetterSlice';

export const Newsletter = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { submitStatus } = useSelector((state) => state.newsLetter);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitNewsLetter({ email }));
    setEmail('');
  };

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

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />

        <button
          className="btn btn-primary-grad btn-subscribe"
          onClick={handleSubmit}
          disabled={submitStatus === 'loading'}
        >
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
