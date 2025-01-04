import React, { useState, useEffect } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { MainImg } from '@/components/pages/blog/create/MainImg';
import { Form } from '@/components/pages/dashboard/Form/Blog_Form';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSingleBlog,
  resetEditStatus,
  editBlog
} from '@/reduxstore/slices/blogSlice';
import { Success_panel } from '@/components/pages/dashboard/Create_Edit/Success_panel';
import { openModal } from '@/reduxstore/slices/uiSlice';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/router';

const Edit = () => {

  const router = useRouter()
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.singleBlog);
  const modalOpen = useSelector((state) => state.ui.isModalOpen);

  const [values, setValues] = useState({
    post_title: '',
    short_descp: '',
    long_descp: '',
    post_tags: '',
    post_image: '',
    blogcat_id: '',
    id: '',
  });

  const {
    post_title,
    short_descp,
    long_descp,
    post_tags,
    post_image,
    blogcat_id,
  } = values;

  useEffect(() => {
    dispatch(fetchSingleBlog(router.query.id));
  }, [router.query.id, dispatch]);

  useEffect(() => {
    if (blog) {
      setValues({
        id: blog.id,
        post_title: blog.post_title,
        short_descp: blog.short_descp,
        long_descp: blog.long_descp,
        post_tags: blog.post_tags,
        post_image: blog.post_image,
        blogcat_id: blog.blogcat_id,
      });
    }
  }, [blog]);

  const [quillKey, setQuillKey] = useState(0);

  const { editStatus } = useSelector((state) => state.blogs);

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
      return <Success_panel msg="Blog Successfully Updated" source={'blog'} />;
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
    dispatch(editBlog(values));
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
          <MainImg mainImg={post_image} getMainPhoto={getMainPhoto} />

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

export default Edit;
