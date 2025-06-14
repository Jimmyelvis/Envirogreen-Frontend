import Image from 'next/image';
import React, { useState } from 'react';
import Location_icon from '@/components/assets/img/location-icon-green.svg';
import Max_price_icon from '@/components/assets/img/max-price.svg';
import Min_price_icon from '@/components/assets/img/min-price.svg';
import Baths_icon from '@/components/assets/img/baths-icon.svg';
import Beds_icon from '@/components/assets/img/beds-icon.svg';
import Building from '@/components/assets/img/building.svg';
import Home_icon from '@/components/assets/img/home-icon.svg';
import Edit_pencil_shadow from '@/components/assets/img/edit-pencil-shadow.svg';
import Trash_can from '@/components/assets/img/trash-can.svg';
import Options_btn from '@/components/assets/img/options-btn.svg';
import { Panel } from '@/components/ui/Panel';
import { deleteuserSave } from '@/reduxstore/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { checkImgpath } from '@/utils/getImgsrc';
import { formatPrice } from '@/utils/formatInfo';
import { motion, AnimatePresence } from 'framer-motion';


export const Saved_Search = ({ entries, name, img, id }) => {
  const dispatch = useDispatch();
  const [showPanel, setShowPanel] = useState(false);

  const getEntries = () => {
    // Get the Icon, and value for each entry
    return Object.entries(entries).map(([key, value], index) => {
      let icon = '';
      switch (key) {
        case 'city_name':
          icon = Location_icon;
          break;
        case 'price_max':
          icon = Max_price_icon;
          break;
        case 'price_min':
          icon = Min_price_icon;
          break;
        case 'baths':
          icon = Baths_icon;
          break;
        case 'beds':
          icon = Beds_icon;
          break;
        case 'state_name':
          icon = Building;
          break;
        case 'category_name':
          icon = Home_icon;
          break;
        default:
          break;
      }

      if (
        value === null ||
        key === 'city_id' ||
        key === 'state_id' ||
        key === 'category_id'
      ) {
        return;
      }

      return (
        <li key={index} className="saved-search_entry">
          <Image
            src={icon}
            alt={value}
            width={320}
            height={320}
            layout="responsive"
            className="saved-search_icon"
          />
          <span className="entry-value">{value}</span>
        </li>
      );
    });
  };

  const renderLink = (editName) => {

    let link

    if (editName) {
      link = `/listings?page=1&searchname=${editName}&searchid=${id}&`;
    } else {
      link = `/listings?page=1&`;
    }

    Object.entries(entries).map(([key, value], index) => {
      switch (key) {
        case 'price_max':
          link += `max=${value  || ''}&`;
          break;
        case 'price_min':
          link += `min=${value  || ''}&`;
          break;
        case 'baths':
          link += `baths=${value  || ''}&`;
          break;
        case 'beds':
          link += `beds=${value  || ''}&`;
          break;
        case 'city_id':
          link += `loc=${value || ''}&`;
          break;
        case 'state_id':
          link += `state=${value || ''}&`;
          break;
        case 'category_id':
          link += `cat=${value  || ''}`;
          break;
        case 'state_name':
          break;
        case 'category_name':
          break;
        case 'city_name':
          break;
        default:
      }

      // loop through the entries and append the values to link as a query string
       

    });
    return link;
  };

  return (
    <div className="saved-search">

      <Image
        src={Options_btn}
        alt="Options"
        width={320}
        height={320}
        layout="responsive"
        className="options_icon"
        onClick={() => setShowPanel(!showPanel)}
      />  

      <AnimatePresence>
        {showPanel && (
          <motion.div 
            className="saved-search_actions"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >

            <Link href={renderLink(name)}>
              <Image
                src={Edit_pencil_shadow}
                alt="Edit"
                width={320}
                height={320}
                layout="responsive"
                className="saved-search_icon"
              />
            </Link>
            <Image
              src={Trash_can}
              alt="Delete"
              width={320}
              height={320}
              layout="responsive"
              className="saved-search_icon"
              onClick={() => dispatch(deleteuserSave(id))}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="saved-search_img">
        <Image
          src={checkImgpath(img)}
          alt={name}
          width={300}
          height={300}
          layout="responsive"
        />
      </div>

      <div className="saved-search_content">
        <Link href={renderLink()}>
          <h3 className="heading-3">{name}</h3>
        </Link>


        <ul className="saved-search_entries">{getEntries()}</ul>
      </div>
    </div>
  );
};
