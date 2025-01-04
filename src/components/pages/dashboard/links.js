import Dashboard_icon from '@/components/assets/img/dashboard-icon.svg';
import Location_icon from '@/components/assets/img/location-icon.svg';
import Staff_icon from '@/components/assets/img/staff-icon.svg';
import House_icon from '@/components/assets/img/house-icon.svg';
import Blog_icon from '@/components/assets/img/blog-icon.svg';
import Settings_btn from '@/components/assets/img/settings-icon.svg';

import Settings_icon_green from '@/components/assets/img/settings-icon-green.svg';
import Staff_icon_green from '@/components/assets/img/staff-icon-green.svg';
import House_icon_green from '@/components/assets/img/house-icon-green.svg';
import Blog_icon_green from '@/components/assets/img/blog-icon-green.svg';
import Location_icon_green from '@/components/assets/img/location-icon-green.svg';
import Dashboard_icon_green from '@/components/assets/img/dashboard-icon-green.svg';

// export const dashboard_links = [
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

export const dashboard_links = (type) => {
  const links = [
    {
      text: 'Dashboard',
      icon: type === 'desktop' ? Dashboard_icon : Dashboard_icon_green
      ,
      dropdown: null,
      href: '/admin',
    },
    {
      text: 'Settings',
      icon: type === 'desktop' ? Settings_btn : Settings_icon_green,
      dropdown: null,
      href: '/admin/settings',
    },
    {
      text: 'Staff',
      icon: type === 'desktop' ? Staff_icon : Staff_icon_green,
      href: '/admin/staff',
    },
    {
      text: 'Listings',
      icon: type === 'desktop' ? House_icon : House_icon_green,
      dropdown: [
        {
          text: 'All Listings',
          href: '/admin/listings',
        },
        {
          text: 'Create Listing',
          href: '/admin/listings/create',
        },
      ],
      href: '#',
    },
    {
      text: 'Locations',
      icon: type === 'desktop' ? Location_icon : Location_icon_green,
      href: '/admin/locations',
    },
    {
      text: 'Blog',
      icon: type === 'desktop' ? Blog_icon : Blog_icon_green,
      dropdown: [
        {
          text: 'All Posts',
          href: '/admin/blog',
        },
        {
          text: 'Create Post',
          href: '/admin/blog/create',
        },
      ],
      href: '#',
    },
  ];

  return links;
};
