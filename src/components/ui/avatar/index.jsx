// Avatar.js
import Image from 'next/image';
import { network } from '@/helpers/constants';

export const Avatar = ({ avatar, classes, staticImg }) => {
  const imageSrc = avatar ? `${network.img}${avatar}` : '/default-avatar.jpg';

  return (
    <div className={`avatar ${classes ? classes : ""}`}>
      <Image 
        src={avatar ? imageSrc : staticImg} 
        alt="User Avatar" 
        width={500}
        height={500}
        layout='responsive'
      />
    </div>
  );
};
