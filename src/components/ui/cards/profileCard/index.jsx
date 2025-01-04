import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Avatar } from '@/components/ui/avatar'
import Facebook_icon from '@/components/assets/img/facebook-icon.svg'
import Twitter_icon from '@/components/assets/img/twitter-icon.svg'
import Email_icon from '@/components/assets/img/email-icon.svg'
import Phone_icon from '@/components/assets/img/phone-icon.svg'


export const ProfileCard = ({
  profile
}) => {
  return (
    <div className="profile-card">
      
      {
        console.log({
          "profile": profile,
        })
      }

       <Avatar
        avatar={profile.photo_path}
        classes="profile-card_avatar"
      />

      <div className="profile-card_details">
        <h2 className="heading-2 profile-card_name">
          <Link href={`/staff/${profile.id}`}>
            {profile.name}
          </Link>
        </h2>
        <h4 className="heading-4 profile-card_role">
          {profile.role_name}
        </h4>
      </div>

      <ul className="profile-card_socials">
        
        <li>
          {profile.facebook && (
            <a href={`facebook.com/${profile.facebook}`}>
              <Image src={Facebook_icon} alt="" width={500} height={500} layout='responsive' />
            </a>
          )}
        </li>

        <li>
          {profile.twitter && (
            <a href={`twitter.com/${profile.twitter}`}>
              <Image src={Twitter_icon} alt="" width={500} height={500} layout='responsive' />
            </a>
          )}
        </li>

        <li>
          {profile.email && (
            <a href={`mailto:${profile.email}`}>
              <Image src={Email_icon} alt="" width={500} height={500} layout='responsive' />
            </a>
          )}
        </li>

        <li>
          {profile.phone && (
            <a href={`tel:${profile.phone}`}>
              <Image src={Phone_icon} alt="" width={500} height={500} layout='responsive' />
            </a>
          )}
        </li>

      </ul> 

    </div>
  )
}
