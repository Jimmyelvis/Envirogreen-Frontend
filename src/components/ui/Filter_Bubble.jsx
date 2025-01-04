import React from 'react';
import Image from 'next/image';
import Wht_Close_btn from '@/components/assets/img/close-wht-btn.svg';

export const Filter_Bubble = ({ 
  key, filter, onClickFn,
}) => {
  return (
    <li className="filter-bubble" key={key}>
      <h4 className="heading-4 filter_value">
        {filter}
      </h4>

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
    </li>
  );
};
