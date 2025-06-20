import React from 'react';
import Image from 'next/image';
import Phone from '@/components/assets/img/Icon awesome-phone-alt-ftr.svg';
import Email from '@/components/assets/img/Icon material-email-ftr.svg';
import Address from '@/components/assets/img/Icon material-send-ftr.svg';
import Link from 'next/link';


export const Footer = () => {
  const navLinks = [
    { href: '/', label: 'Home', className: 'active' },
    {
      href: '/staff',
      label: 'Our Team',
    },
    {
      href: '/staff/background',
      label: 'About Us',
    },
    { href: '/listings', label: 'Listings' },
    { href: '/blogs', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    // { href: '#', label: 'Login', className: 'login' },
  ];

  return (
    <footer>
      <div class="container">
        <div class="entry">
          <h3 className="heading-3">Envirogreen</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
            rem deleniti, est, nulla ab molestias omnis modi qui odit unde
            impedit fugiat dolor quas alias!
          </p>
        </div>

        <div class="entry">
          <h3 className="heading-3">Contact Us</h3>

          <ul class="info">
            <li>
              <Image
                src={Email}
                alt=""
                className="ftr-icon"
                width={20}
                layout="responsive"
              />
              info@envirogreen.com
            </li>
            <li>
              <Image
                src={Phone}
                alt=""
                className="ftr-phone"
                width={20}
                layout="responsive"
              />
              777-777-7777
            </li>
            <li>
              <Image
                src={Address}
                alt=""
                className="ftr-address"
                width={20}
                layout="responsive"
              />
              1969 SunnyVale Road
            </li>
          </ul>
        </div>

        <div class="entry">
          <h3 className="heading-3">Useful Links</h3>

          <ul class="links">
            {
              navLinks.map((link, index) => (
                <li key={index} className={link.className}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <div class="container copycontain">
        <p class="copyright">
          Copyright 2024 <span class="greentxt">Envirogreen Reality</span>
        </p>
      </div>
    </footer>
  );
};
