Below is an example integrating a custom modal hook (as previously discussed) into the given `Listing` component. The idea is to extract the logic related to opening and closing the modal, as well as setting the `modalTarget` and `origin`, into a separate hook. This keeps the component cleaner and less repetitive. The hook will handle interactions with Redux, so the component doesn’t need to know about `dispatch(openModal())` or `dispatch(closeModal())` directly.

**Step 1: Create a Custom Modal Hook (useModal.js)**

```js
// useModal.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '@/reduxstore/slices/uiSlice';

export function useModal() {
  const dispatch = useDispatch();
  const { isModalOpen, modalContent } = useSelector((state) => state.ui);

  const [modalTarget, setModalTarget] = useState(null);
  const [origin, setOrigin] = useState(null);

  const openModalTarget = (target, originKey) => {
    setModalTarget(target);
    setOrigin(originKey);
    dispatch(openModal(originKey));
  };

  const closeModalTarget = () => {
    dispatch(closeModal());
    setModalTarget(null);
    setOrigin(null);
  };

  return {
    isModalOpen,
    modalContent,
    modalTarget,
    origin,
    openModalTarget,
    closeModalTarget,
  };
}
```

**Step 2: Integrate the Hook into Your Listing Component**

Replace your current logic that handles `modalTarget`, `origin`, and `dispatch(openModal(...))` with calls to `useModal()`.

**Before:**  
You were doing:
```jsx
const [modalTarget, setModalTarget] = useState(null);
const [origin, setOrigin] = useState(null);
...
onClick={() => {
  setModalTarget('gallery');
  setOrigin('light-box');
  dispatch(openModal('light-box'));
}}
```

**After (using the hook):**  
Just call `openModalTarget('gallery', 'light-box')` from the hook.

**Full Example:**

```jsx
import Layout from '@/components/ui/Layout';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { wrapper } from '@/reduxstore/store';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '@/components/ui/Panel';
import Modal from '@/components/ui/Modal';
import { setListing, fetchNearbyListings } from '@/reduxstore/slices/listingSlice';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { Lightbox } from '@/components/ui/lightbox';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons';
import renderHTML from "react-render-html";
import { formatPrice, formatPhoneNumber } from '@/utils/formatInfo';
import { parseExtraPhotos, imgsrc } from '@/utils/getImgsrc';
import BedsIcon from '@/components/assets/img/beds-icon.svg';
import BathsIcon from '@/components/assets/img/bathroom-icon.svg';
import GarageIcon from '@/components/assets/img/garage-icon.svg';
import FaceebookIcon from '@/components/assets/img/facebook-icon.svg';
import TwitterIcon from '@/components/assets/img/twitter-icon.svg';
import EmailIcon from '@/components/assets/img/email-icon.svg';
import PhoneIcon from '@/components/assets/img/phone-icon.svg';
import { useModal } from '@/hooks/useModal';  // <-- import the custom hook

const Listing = ({ id }) => {
  const dispatch = useDispatch();
  const { singleListing, nearByListings, nearByListingsCount } = useSelector((state) => state.listings);

  const [singleImg, setSingleImg] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  // Use our custom modal hook
  const { modalTarget, origin, openModalTarget, closeModalTarget } = useModal();

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

    return null;
  };

  const renderAdditionalImages = () => {
    let limit = 5;
    return additionalImages.slice(0, limit).map((photo, index) => {
      if (index + 1 === limit) {
        return (
          <div className="listing-detail_images_gallery_thumbnail thumbnail-overlay" key={index}>
            <Image
              src={photo}
              alt={`Extra photo ${index + 1}`}
              width={500}
              height={300}
              layout="responsive"
              className="thumbnail-img"
            />
            <p
              className="extra-photos"
              onClick={() => openModalTarget('gallery', 'light-box')}
            >
              + {additionalImages.length - limit}
            </p>
          </div>
        );
      }

      return (
        <div className="listing-detail_images_gallery_thumbnail" key={index}>
          <Image
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
              openModalTarget('single-img', 'light-box');
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
          <div className="listing-detail_mobile_images_gallery_thumbnail thumbnail-overlay" key={index}>
            <Image
              src={photo}
              alt={`Extra photo ${index + 1}`}
              width={500}
              height={300}
              layout="responsive"
              className="thumbnail-img_mobile"
            />
            <p
              className="extra-photos"
              onClick={() => openModalTarget('gallery', 'light-box')}
            >
              + {additionalImages.length - limit}
            </p>
          </div>
        );
      }

      return (
        <div className="listing-detail_mobile_images_gallery_thumbnail" key={index}>
          <Image
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
              openModalTarget('single-img', 'light-box');
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
              openModalTarget('single-img', 'light-box');
            }}
          />

          <div className="listing-detail_images_gallery_mobile">
            <div className="entries">{renderAdditionMobileImgs()}</div>
          </div>
        </div>

        <div className="listing-detail_images_gallery">{renderAdditionalImages()}</div>
      </div>
    );
  };

  const getIcons = () => {
    const icons = [
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

    return icons.map((icon, index) => (
      <div className="icon" key={index}>
        <Image src={icon.icon} alt="icon" width={500} height={500} layout="responsive" className="icon-img" />
        <p className="value">{icon.value}</p>
      </div>
    ));
  };

  const getDetails = () => {
    const cityState = (
      <>
        {singleListing.city?.name}, {singleListing.state?.abbrev}
      </>
    );

    return (
      <div className="listing-detail_details">
        <div className="listing-detail_details_top">
          <Sectionheading_left_bar heading={singleListing.street} subheading={cityState} />

          <div className="price">
            <p>{formatPrice(singleListing.price)}</p>
          </div>
        </div>

        <div className="listing-detail_details_bottom">
          <div className="icons">{getIcons()}</div>

          <div className="description">
            <h3 className="heading-3">Description</h3>

            <div className="text">{renderHTML(singleListing?.descrip)}</div>

            <h4
              className="heading-4 readmore"
              onClick={() => openModalTarget('description', 'readmore')}
            >
              Read More
            </h4>
          </div>

          <div className="agent">
            <Avatar avatar={singleListing.user_photo_path} classes="avatar" />

            <Sectionheading_left_bar heading={singleListing.user?.name} subheading={singleListing.user_role} />

            <ul className="agent_socials">
              {singleListing.user?.facebook && (
                <li>
                  <Image src={FaceebookIcon} alt="Facebook icon" width={500} height={500} layout="responsive" />
                  <p>{singleListing.user?.facebook}</p>
                </li>
              )}

              {singleListing.user?.twitter && (
                <li>
                  <Image src={TwitterIcon} alt="Twitter icon" width={500} height={500} layout="responsive" />
                  <p>{singleListing.user?.twitter}</p>
                </li>
              )}

              {singleListing.user?.email && (
                <li>
                  <Image src={EmailIcon} alt="Email icon" width={500} height={500} layout="responsive" />
                  <p>{singleListing.user?.email}</p>
                </li>
              )}

              {singleListing.user?.phone && (
                <li>
                  <Image src={PhoneIcon} alt="Phone icon" width={500} height={500} layout="responsive" />
                  <p>{formatPhoneNumber(singleListing.user?.phone)}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderContactForm = () => (
    <div className="listing-detail_contact">
      <h3 className="heading-3 inquire-heading">Do You Want To Send A Message</h3>
      <div className="form">
        <div className="form-group">
          <label htmlFor="inputName" className="control-label">
            Name*
          </label>
          <input type="text" className="form-control" id="inputName" placeholder="Name" />
        </div>

        <div className="form-group">
          <label htmlFor="inputEmail" className="control-label">
            Email*
          </label>
          <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
        </div>

        <div className="form-group">
          <label htmlFor="inputPhone" className="control-label">
            Phone Number*
          </label>
          <input type="text" className="form-control" id="inputPhone" placeholder="555-5555" />
        </div>

        <div className="form-group">
          <label htmlFor="inputSubject" className="control-label">
            Subject*
          </label>
          <input type="text" className="form-control" id="inputSubject" placeholder="Subject" />
        </div>

        <div className="form-group textarea">
          <label htmlFor="inputMessage" className="control-label">
            How Can I Help*
          </label>
          <textarea className="form-control" rows="13" id="inputMessage"></textarea>
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

  const getPropertiesNearby = () => {
    return (
      nearByListingsCount > 0 && (
        <div className="listing-detail_nearby">
          <h3 className="heading-3 nearby-heading">Nearby Properties</h3>
          {nearByListings.slice(0, 3).map((property, index) => (
            <div className="entry" key={index}>
              <div className="img">
                <Image src={imgsrc(property)} alt="" width={500} height={300} layout="responsive" />
              </div>

              <div className="details">
                <div className="location-price">
                  <h3 className="heading-3 street">{property.street}</h3>
                  <h4 className="heading-4 city">
                    {property.city_name}, {property.state_name}
                  </h4>
                  <h4 className="heading-4 price">{formatPrice(property.price)}</h4>
                </div>

                <ul className="attributes">
                  <li>
                    <Image src={BedsIcon} alt="" width={500} height={500} layout="responsive" />
                    <p>{property.beds}</p>
                  </li>

                  <li>
                    <Image src={BathsIcon} alt="" width={500} height={500} layout="responsive" />
                    <p>{property.baths}</p>
                  </li>

                  <li>
                    <Image src={GarageIcon} alt="" width={500} height={500} layout="responsive" />
                    <p>{property.sqft}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )
    );
  };

  useEffect(() => {
    const houseImages = parseExtraPhotos(singleListing);
    setAdditionalImages(houseImages);
    if (singleListing && singleListing.city_id) {
      dispatch(fetchNearbyListings(singleListing.city_id));
    }
  }, [singleListing, dispatch]);

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

        <Modal modalTarget={modalTarget} origin={origin} selector={'#root_modal'}>
          {checkTarget()}
        </Modal>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.params; // Extract the id from URL parameters
  try {
    const response = await fetch(`${network.api}listings/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    const data = await response.json();
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
});

export default Listing;
```

**What Changed?**  
- We removed direct calls to `setModalTarget`, `setOrigin`, and `dispatch(openModal(...))` from the component. Instead, we used `openModalTarget('gallery', 'light-box')` from the `useModal()` hook.
- The `Modal` component and `checkTarget()` function remain the same. The only difference is how we trigger the modal to open.
- The component is now cleaner and more focused on rendering logic rather than modal state management.
