import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '@/reduxstore/slices/userSlice';

const Admin = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/signin');
    } else if (currentUser?.role?.name !== 'Admin') {
      Router.push('/');
    }
  }, [isAuthenticated, currentUser]);

  return <>{children}</>;
};

export default Admin;
