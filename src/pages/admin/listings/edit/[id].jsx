import React, { useState, useEffect } from 'react'
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { MainImg } from '@/components/pages/listing/create/MainImg';
import { AdditionalImgs } from '@/components/pages/listing/create/AdditionalImgs';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@/reduxstore/store';
import { network } from '@/helpers/constants';
import { openModal } from '@/reduxstore/slices/uiSlice';
import { useRouter } from 'next/router';
import { Form } from '@/components/pages/dashboard/Form/Listing_Form';
import { Success_panel } from '@/components/pages/dashboard/Create_Edit/Success_panel';
import { updateListing } from '@/reduxstore/slices/listingSlice';

import Image from 'next/image';

import { Panel } from '@/components/ui/Panel';
import Modal from '@/components/ui/Modal';

import { fetchListing, resetEditStatus } from '@/reduxstore/slices/listingSlice';
import { parseExtraPhotos, checkImgpath } from '@/utils/getImgsrc';



const Edit = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const tempImg = "https://images.pexels.com/photos/28491964/pexels-photo-28491964/free-photo-of-dolomites-mountain-range-in-canazei-italy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  const listing = useSelector((state) => state.listings.singleListing)
  const modalOpen = useSelector((state) => state.ui.isModalOpen)

       const [values, setValues] = useState({
         street: '',
         city_name: '',
         state_id: '',
         price: '',
         beds: '',
         baths: '',
         sqft: '',
         descrip: '',
         type: '',
         category_id: '',
         user_id: '',
         main_photo: '',
         extraphotos: [],
         extrapicone_path: "",
         extrapictwo_path: "",
         extrapicthree_path: "",
         extrapicfour_path: "",
         id: '',
       });




  useEffect(() => {
    dispatch(fetchListing(router.query.id))
  }, [router.query.id, dispatch]);

       /*
        TODO: We may also need to parse extraphotos state to an array, so that when we sending it to Laravel, we are formating an actual array and not an array that has already been stringified. Because when we received the data from Laravel, extraphotos is likely a stringified array, if we either used Cloudinary for uploading images, or we have already edited the listing before.
      */

  useEffect(() => {
    if (listing) {
      setValues((prevValues) => ({
        ...prevValues,
        id: listing.id,
        street: listing.street,
        city_name: listing.city_name,
        state_id: listing.state_id,
        price: listing.price,
        beds: listing.beds,
        baths: listing.baths,
        sqft: listing.sqft,
        descrip: listing.descrip,
        type: listing.type,
        category_id: listing.category_id,
        user_id: listing.user_id,
        main_photo: listing.main_photo || listing.fullpic_path,
        extrapicone_path: listing.extrapicone_path || "",
        extrapictwo_path: listing.extrapictwo_path || "",
        extrapicthree_path: listing.extrapicthree_path || "",
        extrapicfour_path: listing.extrapicfour_path || "",
      }));

      try {
        let jsonparseImgs;

        if (listing.extraphotos !== null) {
          jsonparseImgs = JSON.parse(listing.extraphotos);

          if (jsonparseImgs.length > 0) {
            setValues((prevValues) => ({
              ...prevValues,
              extraphotos: jsonparseImgs,
            }));

          }
        }

        
      } catch (error) {
        
        console.log('====================================');
        console.log('Error parsing JSON:', error);
        console.log('====================================');
      }

      if (listing.extrapicone_path) {
        setValues((prevValues) => ({
          ...prevValues,
          extraphotos: [
            ...prevValues.extraphotos,
            checkImgpath(listing.extrapicone_path),
          ],
          extrapicone_path: '',
        }));
      }

      if (listing.extrapictwo_path) {
        setValues((prevValues) => ({
          ...prevValues,
          extraphotos: [...prevValues.extraphotos, 
            checkImgpath(listing.extrapictwo_path),],
          extrapictwo_path: '',
        }));
      }

      if (listing.extrapicthree_path) {
        setValues((prevValues) => ({
          ...prevValues,
          extraphotos: [
            ...prevValues.extraphotos,
            checkImgpath(listing.extrapicthree_path),
          ],
          extrapicthree_path: '',
        }))
      }

      if (listing.extrapicfour_path) {
        setValues((prevValues) => ({
          ...prevValues,
          extraphotos: [...prevValues.extraphotos, 
            checkImgpath(listing.extrapicfour_path),],
          extrapicfour_path: '',
        }));

      }


    }


  }, [listing]);

  const {
    street,
    city_name,
    state_id,
    price,
    beds,
    baths,
    sqft,
    descrip,
    type,
    main_photo,
    extraphotos
  } = values;

  const [quillKey, setQuillKey] = useState(0);

  const { editStatus } = useSelector((state) => state.listings);

    /**
   * Piece of state that will be used to determine what component
   * that will be rendered in the modal
   */
    const [modalTarget, setModalTarget] = useState(null);
    const [origin, setOrigin] = useState(null);


  
    /**
     * Check what is the target state, then determine
     * what component should be rendered in the modal.
     */
    const checkTarget = () => {
      if (modalTarget === 'success') {
        return (
        <Success_panel 
          msg="Listing Successfully Updated"
        />
      );
      }
    };
  
    const onChange = (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleBody = (value) => {
      // Log the value to debug
      console.log('ReactQuill value:', value);
      setValues((prevValues) => ({
        ...prevValues,
        descrip: value,
      }));
    };

    const onSubmit = (e) => {
      e.preventDefault();
      console.log('values', values);
  
      // Convert extraphotos array to a JSON string
      const formattedValues = {
        ...values,
        extraphotos: JSON.stringify(values.extraphotos), // Convert extraphotos to JSON string
      };
  
      // Dispatch the createListing action
      dispatch(updateListing(formattedValues));
    };
  
    const getMainPhoto = (photo) => {
      setValues({
        ...values,
        main_photo: photo,
      });
    };
  
    const getExtraPhotos = (photo) => {
      setValues((prevValues) => ({
        ...prevValues,
        extraphotos: [...prevValues.extraphotos, photo], // Append the new photo to the existing array
      }));
    };

    const removeFromExtraPhotos = (photo) => {

      setValues((prevValues) => ({
        ...prevValues,
        extraphotos: prevValues.extraphotos.filter((img) => img !== photo),
      }));
      
    }

    const clear = () => {
      setValues({
        ...values,
        street: '',
        city_name: '',
        state_id: '',
        price: '',
        beds: '',
        baths: '',
        sqft: '',
        descrip: '',
        type: '',
        category_id: '',
        user_id: '',
        main_photo: '',
        extraphotos: [],
      });
  
      setQuillKey((prevKey) => prevKey + 1); // Update the key to re-render ReactQuill
  
      
    };



    useEffect(() => {
      if (editStatus === 'succeeded') {
        setModalTarget('success');
        setOrigin('success');
        dispatch(openModal('success'));
      }
    }, [editStatus, dispatch]);

    useEffect(() => {
      dispatch(resetEditStatus());

    }, [modalOpen]);
    


  return (
    <>
      <DashLayout>
      <MainImg mainImg={main_photo} getMainPhoto={getMainPhoto} />
        <AdditionalImgs
          additionalImgs={extraphotos}
          getExtraPhotos={getExtraPhotos}
          removeFromExtraPhotos={removeFromExtraPhotos}
        />

        <div className="create-edit-form">
            <Form
              street={street}
              city_name={city_name}
              state_id={state_id}
              price={price}
              beds={beds}
              baths={baths}
              sqft={sqft}
              descrip={descrip}
              type=""
              onSubmit={onSubmit}
              onChange={onChange}
              handleBody={handleBody}
              setValues={setValues}
              values={values}
              quillKey={quillKey}
              clearForm={clear}
            />
          </div>

      </DashLayout>
    
      <Modal
        modalTarget={'success'}
        origin={'success'}
        selector={'#root_modal'}
      >
        {checkTarget()}
      </Modal>
    </>
  )
}

export default Edit