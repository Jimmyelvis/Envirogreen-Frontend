import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import Mail_icon from '@/components/assets/img/mail-icon.svg';
import Notification_icon from '@/components/assets/img/notification-icon.svg';
import Modal from '@/components/ui/Modal';
import { useModal } from '@/components/ui/Modal/hooks/useModal';
import { Panel } from '@/components/ui/Panel';
import Dashboard_logo_mobile from '@/components/assets/img/dashboard-logo-mobile.svg';
import dynamic from 'next/dynamic';
import Dash_mobile_menu from '@/components/assets/img/dash-mobile-menu.svg';
import { dashboard_links } from '../links';
import Link from 'next/link';
import Logout_btn from '@/components/assets/img/log-out.svg';
import { logout } from '@/reduxstore/slices/userSlice';

/*
  Dynamic import of the User component to prevent server-side rendering of the component. Because User is reliant on local storage, it will not be available on the server. This will cause an error if the component is rendered on the server. By using dynamic import, we can prevent the component from being rendered on the server.
*/
const User = dynamic(() => import('./User').then((mod) => mod.User), {
  ssr: false,
});

export const Mobile = () => {
  const dispatch = useDispatch();
  const { modalTarget, origin, openModalTarget, closeModalTarget } = useModal();
  const [clickedIndex, setClickedIndex] = useState(null);
  const refs = useRef([]);

  const modalOpen = useSelector((state) => state.ui.isModalOpen);

  useEffect(() => {
    // Reset styles when no item is clicked
    if (clickedIndex === null) {
      refs.current.forEach((ref) => {
        if (ref) ref.style.marginTop = '0';
      });
    } else {
      refs.current.forEach((ref) => {
        if (ref) ref.style.marginTop = '0';
      });

      const dropdownHeight =
        refs.current[clickedIndex].querySelector('.drop-down')?.offsetHeight ||
        0;
      refs.current.forEach((ref, idx) => {
        if (ref && idx === clickedIndex + 1)
          ref.style.marginTop = `${dropdownHeight + 20}px`;
      });
    }
  }, [clickedIndex]);

  const checkTarget = () => {
    if (modalTarget === 'mobileMenu') {
      return renderMobileBg();
    }
  };

  const handleClick = (index) => {
    if (clickedIndex === index) {
      // If the same item is clicked again, close the dropdown
      setClickedIndex(null);
    } else {
      // Open the dropdown for the clicked item
      setClickedIndex(index);
    }
  };

  const renderMobileBg = () => {
    return (
      <div className="mobile-bg">
        <User />

        <ul className="admin-mobile-links">
          {dashboard_links('mobile').map((link, index) => (
            <li
              key={index}
              className={`heading-3 link ${
                clickedIndex === index ? 'active' : ''
              }`}
              onClick={() => handleClick(index)}
              ref={(el) => (refs.current[index] = el)}
            >
              <Link href={link.href}>
                {clickedIndex === index && <div className="active-bg"></div>}
                <Image
                  src={link.icon}
                  alt={`${link.text} Icon`}
                  width={20}
                  height={20}
                  layout="layout"
                  className={`link-icon ${link.text.toLowerCase()}-icon`}
                />

                <h3
                  className={`heading-3 link-text ${
                    clickedIndex === index ? 'active-link-text' : ''
                  }`}
                >
                  {link.text}
                </h3>
              </Link>

              {link.dropdown && (
                <ul className="drop-down">
                  {link.dropdown.map((item, subIndex) => (
                    <li key={subIndex} className="drop-down_link">
                      <div className="dash"></div>
                      <h4 className="heading-4">
                        <Link href={item.href}>{item.text}</Link>
                      </h4>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* <div className="logout-btn" onClick={() => dispatch(logout())}>
          <Image
            src={Logout_btn}
            alt="Dashboard Icon"
            width={20}
            height={20}
            layout="responsive"
            className="logout-icon"
          />
          <h3 className="heading-3 logout-text">Logout</h3>
        </div> */}
      </div>
    );
  };

  return (
    <div className="dash-mobile-nav">
      <div className="dash-mobile-nav_logo">
        <Image
          src={Dashboard_logo_mobile}
          alt="dashboard-logo-mobile"
          layout="responsive"
          width={120}
          height={30}
        />
      </div>
      <div className="dash-mobile-nav_menu">
        <Image
          src={Dash_mobile_menu}
          alt="dash-mobile-menu"
          layout="responsive"
          width={30}
          height={30}
          onClick={() => openModalTarget('mobileMenu')}
        />
      </div>

      <Modal
        modalTarget={modalTarget}
        origin={origin}
        selector={'#root_modal'}
        overlayColor={'rgba(0, 0, 0, 0.93)'}
      >
        {checkTarget()}
      </Modal>
    </div>
  );
};
