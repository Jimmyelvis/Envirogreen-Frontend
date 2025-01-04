import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '@/reduxstore/slices/userSlice';
import { logout } from '@/reduxstore/slices/userSlice';
import { dashboard_links } from './links';
import Dashboard_logo from '@/components/assets/img/dashboard-logo.svg';
import Logout_btn from '@/components/assets/img/log-out.svg';


export const Sidebar = () => {
  const [clickedIndex, setClickedIndex] = useState(null); 
  const refs = useRef([]);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const router = useRouter();
  const dispatch = useDispatch();
  

  // const sidebarLinks = [
  //   {
  //     text: 'Dashboard',
  //     icon: Dashboard_icon,
  //     dropdown: null,
  //     href: '/admin',
  //   },
  //   {
  //     text: 'Settings',
  //     icon: Settings_btn,
  //     dropdown: null,
  //     href: '/admin/settings',
  //   },
  //   {
  //     text: 'Staff',
  //     icon: Staff_icon,
  //     dropdown: null,
  //     href: '/admin/staff',
  //   },
  //   {
  //     text: 'Listings',
  //     icon: House_icon,
  //     dropdown: [
  //       {
  //         text: 'All Listings',
  //         href: '/admin/listings',
  //       },
  //       {
  //         text: 'Create Listing',
  //         href: '/admin/listings/create',
  //       }
  //     ],
  //     href: '#',
  //   },
  //   {
  //     text: 'Locations',
  //     icon: Location_icon,
  //     href: '/admin/locations',
  //   },
  //   {
  //     text: 'Blog',
  //     icon: Blog_icon,
  //     dropdown: [
  //       {
  //         text: 'All Posts',
  //         href: '/admin/blog',
  //       },
  //       {
  //         text: 'Create Post',
  //         href: '/admin/blog/create',
  //       }
  //     ],
  //     href: '#',
  //   },
  // ];

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

  const handleClick = (index) => {
    if (clickedIndex === index) {
      // If the same item is clicked again, close the dropdown
      setClickedIndex(null);
    } else {
      // Open the dropdown for the clicked item
      setClickedIndex(index);
    }
  };

  return (
    <aside className="admin-sidebar">

      <Link href="/">
        <Image
          src={Dashboard_logo}
          alt="Dashboard Logo"
          width={50}
          height={50}
          layout="layout"
          className="dashboard-logo"
        />
      </Link>

      <ul className="admin-sidebar_links">
        {dashboard_links('desktop').map((link, index) => (
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
                      <Link href={item.href}>
                        {item.text}
                      </Link>
                    </h4>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div 
        className="logout-btn"
        onClick={() => dispatch(logout())}
      >
        <Image
          src={Logout_btn}
          alt="Dashboard Icon"
          width={20}
          height={20}
          layout="responsive"
          className="logout-icon"
        />
        <h3 className="heading-3 logout-text">Logout</h3>
      </div>
    </aside>
  );
};
