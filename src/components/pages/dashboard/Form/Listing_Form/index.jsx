import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/buttons';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { SelectListGroup } from '@/components/ui/form/SelectListGroup';
import Loc_Icon from '@/components/assets/img/loc-icon-v3.svg';
import Street_Icon from '@/components/assets/img/street-icon.svg';
import Price_Icon from '@/components/assets/img/price-icon.svg';
import Baths_Icon from '@/components/assets/img/baths-icon.svg';
import Beds_Icon from '@/components/assets/img/bed-icon.svg';
import Sqft_Icon from '@/components/assets/img/sq-green-ruler.svg';
import { singleUploadWithCropping } from '@/utils/Cloudinary';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCitiesByQuery,
  fetchStates, fetchCategories, fetchUserAgents
} from '@/reduxstore/slices/listingSlice';
import { debounce } from '@/utils/debounce';

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

/*
  For the state_id field, we will call the fetchstates action creator to fetch the states from the backend in here. And the states will be displayed in the SelectListGroup component. The fetchstates action creator will be called in the useEffect hook. We will use the passed in state_id prop to set the initial value of the SelectListGroup component. The onChange handler will be used to update the state_id value in the parent component. If this Form is being accesed from the create listing page, the state_id value will be set to 0. If it is being accessed from the edit listing page, the state_id value will be set to the state_id of the listing being edited.
*/

export const Form = ({
  street,
  city_name,
  state_id,
  price,
  beds,
  baths,
  sqft,
  descrip,
  onSubmit,
  onChange,
  handleBody,
  setValues,
  values,
  user_id,
  category_id,
  quillKey,
  clearForm
}) => {

  const [imgFile, setImgFile] = useState(null);
  const [imgHeaderFile, setImgHeaderFile] = useState(null);
  const [body, setBody] = useState("");
  const quillRef = useRef(null);
  const quillModules = useMemo(() => getQuillModules(quillRef), [quillRef]);

  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]); // To store city suggestions
  const [query, setQuery] = useState(city_name); // Synchronize query with city_name

  // get states from the redux store
  const states = useSelector((state) => state.listings.states);

  // get categories from the redux store
  const categories = useSelector((state) => state.listings.categories);

  // get user agents from the redux store
  const userAgents = useSelector((state) => state.listings.userAgents);

  // Fetch cities as the user types
  useEffect(() => {
    if (query.length > 1) {
      dispatch(fetchCitiesByQuery(query)).then((result) => {
        if (result.payload) {
          setSuggestions(result.payload); // Update suggestions when cities are fetched
        }
      });
    } else {
      setSuggestions([]); // Clear suggestions if query is too short
    }
  }, [query, dispatch]);

  // Fetch states on component mount
  useEffect(() => {
    dispatch(fetchStates());
    dispatch(fetchCategories());
    dispatch(fetchUserAgents());
  }, [dispatch]);

  const handleCityInput = (e) => {
    setQuery(e.target.value); // Set the query from input field
    onChange(e); // Call the parent onChange handler to update the state
  }; // Wait for 300ms of inactivity before making the API call

  // // Wrap handleCityInput in debounce and memoize it
  // const handleCityInput = useMemo(
  //   () =>
  //     debounce((e) => {
  //       setQuery(e.target.value); // Set the query from input field
  //       onChange(e); // Call the parent onChange handler to update the state
  //     }, 300), // 300ms debounce delay
  //   [onChange] // only recreate if onChange changes
  // );

  console.log('Current values in Form:', { street, city_name, state_id, price, beds, baths, sqft, descrip });

  console.log({
    "values prop in Form": values
  });
  


  return (
    <form onSubmit={onSubmit}>
      <TextFieldGroup
        placeholder="Street"
        name="street"
        value={street}
        onChange={onChange}
        icon={Street_Icon}
      />

      <TextFieldGroup
        placeholder="Cities"
        name="city_name"
        value={city_name}
        onChange={handleCityInput}
        icon={Loc_Icon}
      >
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((city) => (
              <li
                key={city.id}
                onClick={() => {
                  setQuery(city.name);
                  setValues({ ...values, city_name: city.name });
                  setSuggestions([]);
                }}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </TextFieldGroup>


      <SelectListGroup
        placeholder="State"
        name="state_id"
        value={state_id}
        onChange={onChange}
        icon={Loc_Icon}
        options={[
          { label: 'Select State', value: 0 },
          ...states?.map((state) => ({
            label: state.name,
            value: state.id,
            selected: state.id === state_id ? true : undefined,
          })),
        ]}
      />

      <TextFieldGroup
        placeholder="Price"
        name="price"
        value={price}
        onChange={onChange}
        icon={Price_Icon}
      />

      <div className="number-inputs">
        <TextFieldGroup
          placeholder="Bedrooms"
          name="beds"
          value={beds}
          onChange={onChange}
          type="number"
          icon={Beds_Icon}
          classes="number-input"
        />

        <TextFieldGroup
          placeholder="Baths"
          name="baths"
          value={baths}
          onChange={onChange}
          type="number"
          icon={Baths_Icon}
          classes="number-input"
        />

        <TextFieldGroup
          placeholder="Sqft"
          name="sqft"
          value={sqft}
          onChange={onChange}
          type="number"
          icon={Sqft_Icon}
          classes="number-input"
        />

        <SelectListGroup
          placeholder="Category"
          name="category_id"
          value={values.category_id}
          onChange={onChange}
          icon={Loc_Icon}
          classes={'category-select'}
          options={[
            { label: 'Select Category', value: 0 },
            ...categories?.map((category) => ({
              label: category.name,
              value: category.id,
              selected: category.id === values.category_id ? true : undefined,
            })),
          ]}
        />
      </div>

      <SelectListGroup
        placeholder="Agent"
        name="user_id"
        value={values.user_id}
        onChange={onChange}
        icon={Loc_Icon}
        options={[
          { label: 'Select Agent', value: 0 },
          ...userAgents?.map((agent) => ({
            label: agent.name,
            value: agent.id,
            selected: agent.id === values.user_id ? true : undefined,
          })),
        ]}
      />

      <div className="inputTextbox">
        <ReactQuill
        key={quillKey} // This forces ReactQuill to re-render
          forwardedRef={quillRef}
          modules={quillModules}
          formats={QuillFormats}
          value={descrip}
          placeholder="Write something amazing..."
          onChange={handleBody}
        />

        {/* <textarea
          name="descrip"
          value={descrip}
          onChange={onChange}
          placeholder="Write something amazing..."
        ></textarea> */}
      </div>

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
