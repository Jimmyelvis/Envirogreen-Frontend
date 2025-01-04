import React, { useState, useEffect } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { MainImg } from '@/components/pages/blog/create/MainImg';
import { Form } from '@/components/pages/dashboard/Form/Blog_Form';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, resetCreationStatus } from '@/reduxstore/slices/blogSlice';
import { createAlert } from '@/reduxstore/slices/uiSlice';
import { Success_panel } from '@/components/pages/dashboard/Create_Edit/Success_panel';
import { openModal } from '@/reduxstore/slices/uiSlice';
import Modal from '@/components/ui/Modal';


const Createblog = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    post_title: '',
    short_descp: '',
    long_descp: '',
    post_tags: '',
    post_image: '',
    blogcat_id: '',
  });

  const {
    post_title,
    short_descp,
    long_descp,
    post_tags,
    post_image,
    blogcat_id,
  } = values;

  const { creationStatus } = useSelector((state) => state.blogs);
  const modalOpen = useSelector((state) => state.ui.isModalOpen);
  const [quillKey, setQuillKey] = useState(0);
  const [modalTarget, setModalTarget] = useState('');
  const [origin, setOrigin] = useState(null);


  const checkTarget = () => {
    if (modalTarget === 'success') {
      return (
        <Success_panel 
          msg={'Blog created successfully!'} 
          source={'blog'}
        />
      )
    }
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleBody = (value) => {
  
    setValues((prevValues) => ({
      ...prevValues,
      long_descp: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('values', values);

    // Dispatch the createBlog action
    dispatch(createBlog(values));
  };

  const getMainPhoto = (photo) => {
    setValues({
      ...values,
      post_image: photo,
    });
  };

  const clear = () => {
    setValues({
      ...values,
      post_title: '',
      short_descp: '',
      long_descp: '',
      post_tags: '',
      post_image: '',
      blogcat_id: '',

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

        <div className="create-edit-form-blogs">
          <Form
            post_title={post_title}
            short_descp={short_descp}
            long_descp={long_descp}
            post_tags={post_tags}
            post_image={post_image}
            blogcat_id={blogcat_id}
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

export default Createblog;
