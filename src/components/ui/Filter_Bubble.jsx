import React from 'react';
import Image from 'next/image';
import Wht_Close_btn from '@/components/assets/img/close-wht-btn.svg';

export const Filter_Bubble = ({ 
  key, filter, onClickFn, dark, noClose
}) => {
  return (
    <li className={`filter-bubble ${dark ? 'filter-bubble-dark' : ''}`} key={key}>
      <h4 className="heading-4 filter_value">
        {filter}
      </h4>

      {!noClose && (
        <Image
          src={Wht_Close_btn}
          alt="close"
          width={20}
          height={20}
          layout='responsive'
          className='close-btn_filter-bubble'
          onClick={() => {
            onClickFn();
          }}
        />
      )}


    </li>
  );
};
