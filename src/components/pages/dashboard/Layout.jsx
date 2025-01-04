import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardContent } from './DashboardContent';

export const DashLayout = ({ children }) => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <Header />
      <div className="admin-content">{children}</div>
    </div>
  );
};
