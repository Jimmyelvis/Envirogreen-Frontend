import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/buttons';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { TextAreaFieldGroup } from '@/components/ui/form/TextAreaFieldGroup';
import { SelectListGroup } from '@/components/ui/form/SelectListGroup';
import { singleUploadWithCropping } from '@/utils/Cloudinary';
import { useDispatch, useSelector } from 'react-redux';

import { debounce } from '@/utils/debounce';
import { fetchCategories } from '@/reduxstore/slices/blogSlice';

import { getQuillModules, QuillFormats } from '@/utils/quill';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

export const Form = ({
  blogcat_id,
  post_title,
  short_descp,
  long_descp,
  post_tags,
  post_image,
  onSubmit,
  onChange,
  handleBody,
  setValues,
  values,
  quillKey,
  clearForm,
}) => {
  const [body, setBody] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [imgHeaderFile, setImgHeaderFile] = useState(null);
  const quillRef = useRef(null);
  const quillModules = useMemo(() => getQuillModules(quillRef), [quillRef]);

  // TODO: Create a fetchCategories action creator in the blogSlice as well as a categories entry in the initial state
  // const categories = useSelector((state) => state.blog.categories);

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.blogs.categories);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <form onSubmit={onSubmit}>
      <TextFieldGroup
        name="post_title"
        value={post_title}
        onChange={onChange}
        placeholder="Title"
      />

      <SelectListGroup
        placeholder="Category"
        name="blogcat_id"
        value={values.blogcat_id}
        onChange={onChange}
        // icon={Loc_Icon}
        classes={'category-select'}
        options={[
          { label: 'Select Category', value: 0 },
          ...categories?.map((category) => ({
            label: category.category_name,
            value: category.id,
            selected: category.id === values.blogcat_id ? true : undefined,
          })),
        ]}
      />

      <TextFieldGroup
        name="post_tags"
        value={post_tags}
        onChange={onChange}
        placeholder="Tags"
        classes={'input-tags'}
      />

      <TextAreaFieldGroup
        name="short_descp"
        value={short_descp}
        onChange={onChange}
        placeholder="Short Description"
        extraClasses="short-descp"
        rows={3}
      />

      <ReactQuill
        key={quillKey} // This forces ReactQuill to re-render
        forwardedRef={quillRef}
        modules={quillModules}
        formats={QuillFormats}
        value={long_descp}
        onChange={handleBody}
        placeholder=""
      />

      <div className="btns">
        <Button
          text="Clear"
          classes={`btn-primary btn-thirdcolor-grad btn-clear`}
          onClick={(e) => {
            e.preventDefault();
            clearForm();
          }}
        >
          Clear
        </Button>

        <Button
          type="submit"
          text="Submit"
          classes={`btn-primary btn-primary-grad btn-submit`}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
