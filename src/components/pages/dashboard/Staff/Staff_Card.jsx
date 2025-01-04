import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar';
import Facebook_icon from '@/components/assets/img/facebook-icon.svg';
import Twitter_icon from '@/components/assets/img/twitter-icon.svg';
import Email_icon from '@/components/assets/img/email-icon.svg';
import Phone_icon from '@/components/assets/img/phone-icon.svg';
import Edit_btn from '@/components/assets/img/edit-btn.svg';

export const Staff_Card = ({ staff }) => {
  return (
    <div className="staff-card">
      <Link href={`staff/${staff.id}`}>
        <Image
          src={Edit_btn}
          alt="Edit"
          width={20}
          height={20}
          className="staff-card_edit"
          layout="responsive"
        />
      </Link>

      <Avatar avatar={staff.photo_path} classes="staff-card_avatar" />

      <div className="staff-card_details">
        <h2 className="heading-2 staff-card_name">{staff.name}</h2>
        <h4 className="heading-4 staff-card_role">{staff.role_name}</h4>
      </div>
    </div>
  );
};
