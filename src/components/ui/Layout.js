import React from 'react';
import Link from 'next/link';
import { Nav } from './Nav';
import { Footer } from './footer';
import ScrollButton from './ScrollButton';

const Layout = ({ children }) => {
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    // Fetch the user's name from localStorage or your state management solution
    const name = localStorage.getItem('userName'); // Assuming the user's name is stored under the key 'userName'
    setUserName(name); // If there is no name, this will set userName to null or ''
  }, []);

  return (
    <div className="layout">
      <Nav />

      {children}
      <ScrollButton />
      <Footer />
    </div>
  );
};

export default Layout;
