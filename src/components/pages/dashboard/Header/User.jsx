import React, { useState, useEffect } from 'react';
import Mail_icon from '@/components/assets/img/mail-icon.svg';
import Notification_icon from '@/components/assets/img/notification-icon.svg';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export const User = () => {


  const { user } = useSelector((state) => state.user);

  // console.log('User object:', user);

  if (!user) {
    return <div>Loading...</div>; // Or some other placeholder
  }


  return (
    <div className="user-heading">
      <div className="user-heading_info">
        <Avatar avatar={user?.photo_path} />

        <div className="info_role-name">
          <h3 className="heading-3">
            {user?.name || 'Guest'}
          </h3>
          <p className="paragraph">
          {user?.role?.name || 'No Role Assigned'}
          </p>
        </div>
      </div>

      <div className="user-heading_icons">
        <div className="user-heading_icon">
          <Image
            src={Mail_icon}
            alt="mail-icon"
            className="icon mail-icon"
            layout="responsive"
            width={20}
            height={20}
          />
        </div>
        <div className="user-heading_icon">
          <Image
            src={Notification_icon}
            alt="notification-icon"
            className="icon notification-icon"
            layout="responsive"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};
