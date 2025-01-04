import React from 'react';
import Link from 'next/link';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import Image from 'next/image';
import Mass from '@/components/assets/img/states/mass.jpg';
import Conn from '@/components/assets/img/states/conn.jpg';
import Hamp from '@/components/assets/img/states/hamp.jpg';
import Maine from '@/components/assets/img/states/maine.jpg';
import Verm from '@/components/assets/img/states/verm.jpg';
import Rhode from '@/components/assets/img/states/rhode.jpg';

export const Communities = () => {
  const states = [
    {
      name: 'Massachusetts',
      img: Mass,
      link: `/listings?page=1&state=21`,
    },
    {
      name: 'Connecticut',
      img: Conn,
      link: `/listings?page=1&state=7`,
    },
    {
      name: 'Rhode Island',
      img: Rhode,
      link: `/listings?page=1&state=30`,
    },
    {
      name: 'New Hampshire',
      img: Hamp,
      link: `/listings?page=1&state=29`,
    },
    {
      name: 'Maine',
      img: Maine,
      link: `/listings?page=1&state=19`,
    },
    {
      name: 'Vermont',
      img: Verm,
      link: `/listings?page=1&state=45`,
    },
  ];

  return (
    <div className="communities">
      <Sectionheading_left_bar heading="Featured" subheading="Communities" />

      <ul className="communities_container">
        {states.map((state, index) => (
          <li key={index} className="communities_item">
            <Link href={state.link}>
              <div className="overlay"></div>
              <Image src={state.img} alt="" className="img-bg" fill={true} />

              <div className="communities_item_content">
                <p className="explore">Explore</p>
                <h3 className="heading-3 communities_item_state">
                  {state.name}
                </h3>
                <p className="properties">Properties</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <button className="btn btn-primary-grad btn-communities">
        <Link href="/listings">View All</Link>
      </button>
    </div>
  );
};
