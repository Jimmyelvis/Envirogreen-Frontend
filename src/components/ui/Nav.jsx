import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/assets/img/envirogreen-logo.svg';
import Mobile_Menu_Icon from '@/components/assets/img/mobile-menu-icon.svg';
import Close_btn from '@/components/assets/img/close_button.svg';
import {
  setMobileBgOn,
  setMobileBgOff,
  openModal,
} from '@/reduxstore/slices/uiSlice';
import { changeBg } from '@/utils/changeBg';
import { Panel } from '@/components/ui/Panel';
import { AuthForm } from '@/components/ui/Authform';
import Modal from '@/components/ui/Modal';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  logout,
} from '@/reduxstore/slices/userSlice';
import { checkAuthRole } from '@/utils/checkAuthRole';
import NProgress from 'nprogress';
import Router from 'next/router';
import { useRouter } from 'next/router';
import useScrollProgress from './ScrollButton/hooks/useScrollProgress';

export const Nav = () => {
  // const limit = 115;

  /*
      Check to see if if the component has mounted on the client.
      Before the component mounts (hasMounted is false), we render null.
    */
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();
  const scrollProgress = useScrollProgress();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const mobileBgOn = useSelector((state) => state.ui.mobileBgOn);
  const [overlayActive, setOverlayActive] = useState(false);
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let closeTimeoutId;

  const navLinks = [
    { href: '/', label: 'Home' },
    {
      href: '#',
      label: 'About Us',
      drop_down_links: [
        { href: '/staff', label: 'Our Team' },
        { href: '/staff/background', label: 'Background' },
      ],
    },
    { href: '/listings', label: 'Listings' },
    { href: '/blogs', label: 'Blogs' },
    { href: '#', label: 'Contact' },
  ];

  /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
  const [modalTarget, setModalTarget] = useState(null);
  const [origin, setOrigin] = useState(null);

  /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
  const checkTarget = () => {
    if (modalTarget === 'login') {
      return <AuthForm />;
    }
  };

  const checkAuthStatus = () => {
    if (isAuthenticated && hasMounted) {
      return (
        <>
          <li>
            {checkAuthRole(currentUser) ? (
              <Link href="/admin">Admin</Link>
            ) : (
              <Link href="/userpage">User Page</Link>
            )}
          </li>

          <li
            className="auth"
            onClick={() => {
              dispatch(logout());
            }}
          >
            log out
          </li>
        </>
      );
    } else {
      return (
        <p
          onClick={() => {
            dispatch(openModal('login'));
            setModalTarget('login');
            setOrigin('login');

            console.log('login clicked');
          }}
          className="auth"
        >
          Login
        </p>
      );
    }
  };

  const handleClose = () => {
    setOverlayActive(false);
    setShowMobileLinks(false);
    closeTimeoutId = setTimeout(() => {
      dispatch(setMobileBgOff());
    }, 500);
  };

  // Use useEffect to add or remove the overflow class
  useEffect(() => {
    let timeoutId;

    if (mobileBgOn) {
      timeoutId = setTimeout(() => {
        setOverlayActive(true);
        setShowMobileLinks(true);
      }, 100);
      document.body.classList.add('overflow');
    } else {
      setOverlayActive(false);
      setShowMobileLinks(false);
      document.body.classList.remove('overflow');
    }

    // Clean up on unmount and reset timeout
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(closeTimeoutId);
      document.body.classList.remove('overflow');
    };
  }, [mobileBgOn, closeTimeoutId]);

  /*
    Set this to true after this component has mounted
  */
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setScrolled(scrollProgress > 3);
  }, [scrollProgress]);

  useEffect(() => {
    Router.onRouteChangeStart = (url) => NProgress.start();
    Router.onRouteChangeComplete = (url) => NProgress.done();
    Router.onRouteChangeError = (url) => NProgress.done();
  }, [Router]);

  const isChildActive = (dropDownLinks) => {
    // If any child’s href matches our current path,
    // or “startsWith” for subroutes, mark parent as active
    return dropDownLinks?.some((link) => router.pathname.startsWith(link.href));
  };

  return (
    <>
      <div className={scrolled ? 'nav nav-scrolled' : 'nav'}>
        <Image
          src={Logo}
          alt="envirogreen-logo"
          priority={true}
          className="logo"
        />
        <ul className="links">
          {navLinks.map((link, index) => {
            // const isActive = router.pathname === link.href ? 'active' : '';

            // 1) If it has children, check if child is active
            const activeChildren =
              link.drop_down_links && isChildActive(link.drop_down_links);

            // 2) If it’s a direct link (no children), compare the path
            const directlyActive = router.pathname === link.href;

            // 3) Combine either is child active or direct match
            const isActive = activeChildren || directlyActive ? 'active' : '';

            return (
              <li key={index} className={link.className}>
                {link.onClickFunction ? (
                  <p
                    onClick={() => {
                      dispatch(openModal('login'));
                      setModalTarget('login');
                      setOrigin('login');
                    }}
                    className="login-label"
                  >
                    {link.label}
                  </p>
                ) : (
                  <Link href={link.href} className={isActive}>
                    {link.label}
                  </Link>
                )}

                {link.drop_down_links && (
                  <ul className="dropdown">
                    {link.drop_down_links.map((dropdownLink, idx) => {
                      // For each child, highlight if exactly matches the router pathname
                      const childActive =
                        router.pathname === dropdownLink.href
                          ? 'active-child'
                          : '';

                      return (
                        <li key={idx}>
                          <Link
                            href={dropdownLink.href}
                            className={childActive}
                          >
                            {dropdownLink.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}

          {checkAuthStatus()}
        </ul>
      </div>

      <div
        className={scrolled ? 'nav-mobile nav-mobile-scrolled' : 'nav-mobile'}
      >
        <Image
          src={Logo}
          alt="envirogreen-logo"
          priority={true}
          className="nav-mobile_logo"
          width={100}
          layout="responsive"
        />

        <Image
          src={Mobile_Menu_Icon}
          alt="mobile-menu-icon"
          priority={true}
          className="nav-mobile_menu-icon"
          width={100}
          layout="responsive"
          onClick={() => dispatch(setMobileBgOn())}
        />

        {mobileBgOn && (
          <div className="mobile-links-bg">
            <Image
              src={Close_btn}
              alt="close-button"
              priority={true}
              className="mobile-links-bg_close-btn"
              width={100}
              layout="responsive"
              onClick={handleClose}
            />

            <ul
              className={`mobile-links-bg_links ${
                showMobileLinks ? 'show' : ''
              }`}
            >
              {navLinks.map((link, index) => (
                <li key={index} className={link.className}>
                  <a href={link.href}>{link.label}</a>
                  {link.drop_down_links && (
                    <ul className="dropdown">
                      {link.drop_down_links.map((dropdownLink, idx) => (
                        <li key={idx}>
                          <a href={dropdownLink.href}>{dropdownLink.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className={`overlay ${overlayActive ? 'active' : ''}`}></div>
          </div>
        )}
      </div>

      <Modal modalTarget={modalTarget} origin={origin} selector={'#root_modal'}>
        {checkTarget()}
      </Modal>
    </>
  );
};
