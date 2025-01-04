import React, { useState, useEffect } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { MainImg } from '@/components/pages/listing/create/MainImg';
import { AdditionalImgs } from '@/components/pages/listing/create/AdditionalImgs';
import { Form } from '@/components/pages/dashboard/Form/Listing_Form';
import { useDispatch, useSelector } from 'react-redux';
import { createListing, resetCreationStatus } from '@/reduxstore/slices/listingSlice';
import { createAlert } from '@/reduxstore/slices/uiSlice';
import Modal from '@/components/ui/Modal';
import { Success_panel } from '@/components/pages/dashboard/Create_Edit/Success_panel';
import { openModal } from '@/reduxstore/slices/uiSlice';

const Create = () => {
  const dispatch = useDispatch();

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
  });

  // const [values, setValues] = useState({
  //   street: "test",
  //   city_name: "Springfield",
  //   state_id: 21,
  //   price: 500000,
  //   beds: 5,
  //   baths: 2,
  //   sqft: 300,
  //   descrip: "<p>Elegant custom home offers unparalleled craftsmanship and exceptional amenities! This French-inspired design is truly remarkable inside and out.Features include cherry cabinets, quartz countertops, crown molding, custom windows provide plenty of natural lighting, expansive decking (1000 sq. ft.), gourmet kitchen with island (great for entertaining), gorgeous master suite, den, storage, plus STUNNING views </p>",
  //   type: "",
  //   category_id: 1,
  //   user_id: "13",
  //   main_photo: "https://res.cloudinary.com/dwgjvssdt/image/upload/v1713916455/Envirogreen/jinjoe_a_large_home_in_a_quiet_neighborhood_in_the_style_of_u_63eda1cd-a1a8-4f2d-837a-6398244bab67_1.png",
  //   extraphotos: "[\"https://res.cloudinary.com/dwgjvssdt/image/upload/v1713916451/Envirogreen/blackbirdai_85975_interior_of_a_modern_european_flat_bedroom_ph_5ca63423-4947-416e-8089-369cc3b4e565.png\", \"https://res.cloudinary.com/dwgjvssdt/image/upload/v1713916444/Envirogreen/jadedea_An_8k_uhd_resolution_photo_realistic_living_room_with_a_90c4ba5d-2e2a-4715-929a-e424ea83b002.png\"]",
  // })

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
  } = values;

  const [quillKey, setQuillKey] = useState(0);

  const tempImg =
    'https://images.pexels.com/photos/28491964/pexels-photo-28491964/free-photo-of-dolomites-mountain-range-in-canazei-italy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const additionalImgs = [tempImg, tempImg, tempImg];

  const { creationStatus } = useSelector((state) => state.listings);
  const modalOpen = useSelector((state) => state.ui.isModalOpen)


  // create a function to get cities from the backend when a user types in the city input field

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
          msg={'Listing created successfully!'}
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
    dispatch(createListing(formattedValues));
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
    if (creationStatus === 'succeeded') {
      setModalTarget('success');
      setOrigin('success');
      dispatch(openModal('success'));
    }
  }, [creationStatus, dispatch]);

  useEffect(() => {
    dispatch(resetCreationStatus());

  }, [modalOpen]);

  return (
    <>
      <DashLayout>
        <MainImg mainImg={null} getMainPhoto={getMainPhoto} />
        <AdditionalImgs additionalImgs={null} getExtraPhotos={getExtraPhotos} />

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
  );
};

export default Create;
