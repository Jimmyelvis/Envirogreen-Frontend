Below is an example of how you might refactor your component to use a custom `useModal` hook for managing the modal logic, making the code cleaner and less repetitive. The main idea is to extract the state and functions related to modals into a separate hook, so your component doesn't have to manually handle `modalTarget`, `origin`, and dispatching `openModal`/`closeModal` each time.

### The Custom Hook (useModal.js)

Create a file `useModal.js` (in `hooks` folder or wherever you keep custom hooks):

```js
// useModal.js
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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

  // If you want, you can add side effects or other logic here
  // For example, remove body overflow when modal is closed:
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow');
    } else {
      document.body.classList.remove('overflow');
    }
  }, [isModalOpen]);

  return {
    isModalOpen,
    modalContent,
    modalTarget,
    origin,
    openModalTarget,
    closeModalTarget
  };
}
```

### Using the Hook in Your Component

Now in your `Listing` component, instead of manually handling `modalTarget` and `origin` and dispatching `openModal`, you can just call `openModalTarget('gallery','light-box')` from the hook:

```jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/ui/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@/reduxstore/store';
import { network } from '@/helpers/constants';
import { useRouter } from 'next/router';

// Import your hook
import { useModal } from '@/hooks/useModal';

// Icons and other imports...
import FaceebookIcon from '@/components/assets/img/facebook-icon.svg';
import TwitterIcon from '@/components/assets/img/twitter-icon.svg';
import EmailIcon from '@/components/assets/img/email-icon.svg';
import PhoneIcon from '@/components/assets/img/phone-icon.svg';
import Image from 'next/image';
import { Panel } from '@/components/ui/Panel';
import Modal from '@/components/ui/Modal';
import { setListing, fetchNearbyListings } from '@/reduxstore/slices/listingSlice';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { imgsrc, parseExtraPhotos } from '@/utils/getImgsrc';
import { Lightbox } from '@/components/ui/lightbox';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/buttons';
import renderHTML from "react-render-html";
import { formatPrice, formatPhoneNumber } from '@/utils/formatInfo';

const Listing = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleListing, nearByListings, nearByListingsCount } = useSelector((state) => state.listings);

  const [singleImg, setSingleImg] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  // Use your modal hook here
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
      )
    }
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
  }

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
            <div className="entries">
              {renderAdditionMobileImgs()}
            </div>
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
      { icon: '/path/to/bed-icon.svg', value: singleListing.beds },
      { icon: '/path/to/bath-icon.svg', value: singleListing.baths },
      { icon: '/path/to/garage-icon.svg', value: singleListing.sqft },
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
          <Sectionheading_left_bar
            heading={singleListing.street}
            subheading={cityState}
          />
          <div className="price">
            <p>{formatPrice(singleListing.price)}</p>
          </div>
        </div>

        <div className="listing-detail_details_bottom">
          <div className="icons">{getIcons()}</div>

          <div className="description">
            <h3>Description</h3>
            <div className="text">
              {renderHTML(singleListing?.descrip)}
            </div>
            <h4
              className="heading-4 readmore"
              onClick={() => openModalTarget('description', 'readmore')}
            >
              Read More
            </h4>
          </div>

          <div className="agent">
            <Avatar avatar={singleListing.user_photo_path} classes="avatar" />

            <Sectionheading_left_bar
              heading={singleListing.user?.name}
              subheading={singleListing.user_role}
            />

            <ul className="agent_socials">
              {/* Similar logic as before */}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderContactForm = () => {
    return (
      <div className="listing-detail_contact">
        {/* same as before */}
      </div>
    );
  };

  const getPropertiesNearby = () => {
    return (
      nearByListingsCount > 0 && (
        <div className="listing-detail_nearby">
          {/* same logic as before */}
        </div>
      )
    )
  };

  useEffect(() => {
    const houseImages = parseExtraPhotos(singleListing);
    setAdditionalImages(houseImages);
    dispatch(fetchNearbyListings(singleListing.city_id));
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

        <Modal
          modalTarget={modalTarget}
          origin={origin}
          selector="#root_modal"
        >
          {checkTarget()}
        </Modal>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.params;

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
  }
);

export default Listing;
```

### What Changed?

- We imported `useModal` at the top.
- Removed local `modalTarget` and `origin` states—these are now managed inside `useModal`.
- Instead of manually calling `dispatch(openModal(...))`, we use `openModalTarget('some-target', 'some-origin')`.
- Checking if the modal should open or close no longer requires direct references to Redux actions in the component.

This approach makes the modal logic more portable and easier to manage. If another component needs a modal, it can simply use the same hook.