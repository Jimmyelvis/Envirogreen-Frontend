/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/ui/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@/reduxstore/store';
import { network } from '@/helpers/constants';
import { openModal } from '@/reduxstore/slices/uiSlice';
import { useRouter } from 'next/router';

// Icons ------
import FaceebookIcon from '@/components/assets/img/facebook-icon.svg';
import TwitterIcon from '@/components/assets/img/twitter-icon.svg';
import EmailIcon from '@/components/assets/img/email-icon.svg';
import PhoneIcon from '@/components/assets/img/phone-icon.svg';
import Housebtn from '@/components/assets/img/house-btn.svg';
import Apartbtn from '@/components/assets/img/apart-btn.svg';
import Wht_Close_btn from '@/components/assets/img/close-wht-btn.svg';
import CalenderIcon from '@/components/assets/img/calender-icon.svg';
import BedsIcon from '@/components/assets/img/beds-icon.svg';
import BathsIcon from '@/components/assets/img/bathroom-icon.svg';
import GarageIcon from '@/components/assets/img/garage-icon.svg';

import Image from 'next/image';
import { Panel } from '@/components/ui/Panel';
import Modal from '@/components/ui/Modal';
import {
  setListing,
  fetchNearbyListings,
  addToWishlist, removeFromWishlist
} from '@/reduxstore/slices/listingSlice';
import { getUsersWishlist } from '@/reduxstore/slices/userSlice';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { imgsrc, parseExtraPhotos } from '@/utils/getImgsrc';
import { Lightbox } from '@/components/ui/lightbox';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons';
import renderHTML from 'react-render-html';
import { formatPrice, formatPhoneNumber } from '@/utils/formatInfo';
import Bookmark_icon from '@/components/assets/img/bookmark-icon.svg';
import Bookmark_icon_filled from '@/components/assets/img/bookmark-icon-filled.svg';
import { AgentCard } from '@/components/pages/listing/agaentCard';

const Listing = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleListing, listings, nearByListings, nearByListingsCount } =
    useSelector((state) => state.listings);
  const { user, userWishList } = useSelector((state) => state.user);

  const [singleImg, setSingleImg] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
  const [modalTarget, setModalTarget] = useState(null);
  const [origin, setOrigin] = useState(null);

  const [hasBook, sethasBook] = useState(null);

  const handleWishlistClick = async () => {
    if (!user) {
      dispatch(createAlert('Please login to manage your wishlist', 'warning'));
      return;
    }

    if (!hasBook) {

    try {
      await dispatch(addToWishlist(singleListing.id)).unwrap();
      sethasBook(!hasBook);
    } catch (error) {
      console.error('Wishlist update failed:', error);
    }

    } else {
      try {
        await dispatch(removeFromWishlist(singleListing.id)).unwrap();
        sethasBook(!hasBook);
      } catch (error) {
        console.error('Wishlist update failed:', error);
      }
    }
  };

  /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
  const checkTarget = () => {
    if (modalTarget === 'gallery') {
      return <Lightbox gallery={additionalImages}></Lightbox>;
    }

    if (modalTarget === 'single-img') {
      return <Lightbox gallery={additionalImages} singleImg={singleImg} />;
    }

    if (modalTarget === 'description') {
      return (
        <Panel className="description-panel">
          <h3 className="heading-3">Description</h3>
          {renderHTML(singleListing.descrip)}
        </Panel>
      );
    }
  };

  const renderAdditionalImages = () => {
    let limit = 5;

    return additionalImages.slice(0, limit).map((photo, index) => {
      if (index + 1 === limit) {
        return (
          <div className="listing-detail_images_gallery_thumbnail thumbnail-overlay">
            <Image
              key={index}
              src={photo}
              alt={`Extra photo ${index + 1}`}
              width={500}
              height={300}
              layout="responsive"
              className="thumbnail-img"
            />
            <p
              className="extra-photos"
              onClick={() => {
                setModalTarget('gallery');
                setOrigin('light-box');
                dispatch(openModal('light-box'));
              }}
            >
              + {additionalImages.length - limit}
            </p>
          </div>
        );
      }

      return (
        <div className="listing-detail_images_gallery_thumbnail">
          <Image
            key={index}
            src={photo}
            alt={`Extra photo ${index + 1}`}
            width={500}
            height={300}
            layout="responsive"
            className="thumbnail-img"
            onClick={() => {
              setSingleImg(
                <Image
                  src={photo}
                  alt={`Extra photo ${index + 1}`}
                  width={500}
                  height={300}
                  layout="responsive"
                  className="thumbnail-img"
                />
              );
              setModalTarget('single-img');
              setOrigin('light-box');
              dispatch(openModal('light-box'));
            }}
          />
        </div>
      );
    });
  };

  const renderAdditionMobileImgs = () => {
    let limit = 3;

    return additionalImages.slice(0, limit).map((photo, index) => {
      if (index + 1 === limit) {
        return (
          <div className="listing-detail_mobile_images_gallery_thumbnail thumbnail-overlay">
            <Image
              key={index}
              src={photo}
              alt={`Extra photo ${index + 1}`}
              width={500}
              height={300}
              layout="responsive"
              className="thumbnail-img_mobile"
            />
            <p
              className="extra-photos"
              onClick={() => {
                setModalTarget('gallery');
                setOrigin('light-box');
                dispatch(openModal('light-box'));
              }}
            >
              + {additionalImages.length - limit}
            </p>
          </div>
        );
      }

      return (
        <div className="listing-detail_mobile_images_gallery_thumbnail">
          <Image
            key={index}
            src={photo}
            alt={`Extra photo ${index + 1}`}
            width={500}
            height={300}
            layout="responsive"
            className="thumbnail-img_mobile"
            onClick={() => {
              setSingleImg(
                <Image
                  src={photo}
                  alt={`Extra photo ${index + 1}`}
                  width={500}
                  height={300}
                  layout="responsive"
                  className="thumbnail-img_mobile"
                />
              );
              setModalTarget('single-img');
              setOrigin('light-box');
              dispatch(openModal('light-box'));
            }}
          />
        </div>
      );
    });
  };

  const getImages = () => {
    return (
      <div className="listing-detail_images">
        <div className="listing-detail_images_mainphoto">
          {
            <Image
              src={imgsrc(singleListing)}
              alt=""
              width={500}
              height={300}
              layout="responsive"
              className="main-img"
              onClick={() => {
                setSingleImg(
                  <Image
                    src={imgsrc(singleListing)}
                    alt=""
                    width={500}
                    height={300}
                    layout="responsive"
                    className="main-img"
                  />
                );
                setModalTarget('single-img');
                setOrigin('light-box');
                dispatch(openModal('light-box'));
              }}
            />
          }

          <div className="listing-detail_images_gallery_mobile">
            <div className="entries">{renderAdditionMobileImgs()}</div>
          </div>
        </div>

        <div className="listing-detail_images_gallery">
          {renderAdditionalImages()}
        </div>
      </div>
    );
  };

  const getIcons = () => {
    const icons = [
      // {
      //   icon: CalenderIcon,
      //   value: 2000,
      // },
      {
        icon: BedsIcon,
        value: singleListing.beds,
      },
      {
        icon: BathsIcon,
        value: singleListing.baths,
      },
      {
        icon: GarageIcon,
        value: singleListing.sqft,
      },
    ];

    return icons.map((icon, index) => {
      return (
        <div className="icon">
          <Image
            src={icon.icon}
            alt="icon"
            width={500}
            height={500}
            layout="responsive"
            className="icon-img"
          />
          <p className="value">{icon.value}</p>
        </div>
      );
    });
  };

  const getDetails = () => {
    const cityState = (
      <>
        {singleListing.city?.name},{singleListing.state?.abbrev}
      </>
    );

    return (
      <div class="listing-detail_details">
        <div className="listing-detail_details_top">
          <Sectionheading_left_bar
            heading={singleListing.street}
            subheading={cityState}
          />

          <div className="price">
            <p>{formatPrice(singleListing.price)}</p>
          </div>
        </div>

        <div className="listing-detail_details_bottom">
          <div className="icons">
            {getIcons()}

            <div className="bookmark">
              <Image
                src={hasBook ? Bookmark_icon_filled.src : Bookmark_icon.src}
                alt="Bookmark"
                width={54}
                height={54}
                unoptimized
                onClick={handleWishlistClick}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>

          <div className="description">
            <Sectionheading heading="Description" />

            <div className="text">{renderHTML(singleListing?.descrip)}</div>

            {/* <h4
              className="heading-4 readmore"
              onClick={() => {
                setModalTarget('description');
                setOrigin('readmore');
                dispatch(openModal('readmore'));
              }}
            >
              Read More
            </h4> */}
          </div>

          <AgentCard
            singleListing={singleListing}
          />

        </div>
      </div>
    );
  };

  const renderContactForm = () => {
    return (
      <div className="listing-detail_contact">
        <h3 className="heading-3 inquire-heading">
          Do You Want To Send A Message
        </h3>
        <div class="form">
          <div class="form-group">
            <label for="inputEmail3" class="control-label">
              Name*
            </label>
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="Name"
            />
          </div>

          <div class="form-group">
            <label for="inputEmail3" class="control-label">
              Email*
            </label>
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="Email"
            />
          </div>

          <div class="form-group">
            <label for="inputEmail3" class="control-label">
              Phone Number*
            </label>
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="555-5555"
            />
          </div>

          <div class="form-group">
            <label for="inputEmail3" class="control-label">
              Subject*
            </label>
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="Subject"
            />
          </div>

          <div class="form-group textarea">
            <label for="inputEmail3" class="control-label">
              How Can I Help*
            </label>
            <textarea class="form-control" rows="13"></textarea>
          </div>

          <Button
            classes="btn-primary btn-primary-grad btn-send"
            onClick={() => {
              alert('Message sent');
            }}
          >
            Send Message
          </Button>
        </div>
      </div>
    );
  };

  const getPropertiesNearby = (params) => {
    return (
      nearByListingsCount > 0 && (
        <div className="listing-detail_nearby">
          <h3 className="heading-3 nearby-heading">Nearby Properties</h3>
          {nearByListings.slice(0, 3).map((property, index) => {
            return (
              <Link href={`/listing/${property.id}`}>
                <div className="entry">
                  <div className="img">
                    <Image
                      src={imgsrc(property)}
                      alt=""
                      width={500}
                      height={300}
                      layout="responsive"
                    />
                  </div>

                  <div className="details">
                    <div className="location-price">
                      <h3 className="heading-3 street">{property.street}</h3>
                      <h4 className="heading-4 city">
                        {property.city_name}, {property.state_name}
                      </h4>
                      <h4 className="heading-4 price">
                        {formatPrice(property.price)}
                      </h4>
                    </div>

                    <ul className="attributes">
                      <li>
                        <Image
                          src={BedsIcon}
                          alt=""
                          width={500}
                          height={500}
                          layout="responsive"
                        />
                        <p>{property.beds}</p>
                      </li>

                      <li>
                        <Image
                          src={BathsIcon}
                          alt=""
                          width={500}
                          height={500}
                          layout="responsive"
                        />
                        <p>{property.baths}</p>
                      </li>

                      <li>
                        <Image
                          src={GarageIcon}
                          alt=""
                          width={500}
                          height={500}
                          layout="responsive"
                        />
                        <p>{property.sqft}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )
    );
  };

  useEffect(() => {
    const hasBookmark = userWishList.some(
      (wishlist) =>
        parseInt(wishlist.property_id, 10) === parseInt(singleListing.id, 10)
    );

    if (hasBookmark) {
      sethasBook(true);
    } else {
      sethasBook(false);
    }
  }, [singleListing, userWishList,dispatch]);

  // Use useEffect to update additionalImages when singleListing changes
  useEffect(() => {
    const houseImages = parseExtraPhotos(singleListing);
    setAdditionalImages(houseImages); // Set additional images once
    dispatch(
      fetchNearbyListings({
        cityId: singleListing.city_id,
        excludeId: singleListing.id,
      })
    );
  }, [dispatch, router.query.id, singleListing]);

  useEffect(() => {
    dispatch(getUsersWishlist());
  }, [dispatch]);

  return (
    <Layout>
      <div className="listing-detail">
        {!singleListing ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {getImages()}
            {getDetails()}
            {renderContactForm()}
            {getPropertiesNearby()}
          </>
        )}

        <Modal
          modalTarget={modalTarget}
          origin={origin}
          selector={'#root_modal'}
        >
          {checkTarget()}
        </Modal>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.params; // Extract the id from URL parameters
    console.log('[SSR] running for listing ID:', context.params.id);
    try {
      const response = await fetch(`${network.api}listings/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      console.log('data:', data); // Log data to check the structure and contents
      store.dispatch(setListing(data));
    } catch (error) {
      console.error('Failed to fetch listings:', error);
      return {
        props: { error: error.message },
      };
    }
    return {
      props: {},
    };
  }
);

export default Listing;
