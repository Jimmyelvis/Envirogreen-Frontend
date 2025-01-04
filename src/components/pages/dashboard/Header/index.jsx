import React from 'react';
import dynamic from 'next/dynamic'
// import { User } from './User';

/*
  Dynamic import of the User component to prevent server-side rendering of the component. Because User is reliant on local storage, it will not be available on the server. This will cause an error if the component is rendered on the server. By using dynamic import, we can prevent the component from being rendered on the server.
*/
const User = dynamic(() => import('./User').then((mod) => mod.User), { ssr: false });
import { Mobile } from './Mobile';


export const Header = () => {
  return (
    <header className="admin-header">
      <User />
      <Mobile />
    </header>
  );
};

