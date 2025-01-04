import React from 'react';
import { Select } from '@/components/ui/select';
import Image from 'next/image';
import Housebtn from '@/components/assets/img/house-btn.svg';
import Apartbtn from '@/components/assets/img/apart-btn.svg';
import Baths_Icon from '@/components/assets/img/baths-icon.svg';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';

export const Filters = ({
  states,
  cities,
  selectedState,
  setSelectedState,
  setstateId,
  selectedCity,
  setSelectedCity,
  setCityId,
  setProperty,
  propertyType,
  handleMinPriceChange,
  handleMaxPriceChange,
  minPrice,
  maxPrice,
  setBeds,
  bedsNum,
  setBaths,
  bathsNum,
  setbathsNum,
  setbedsNum,
  debouncedRouterPush,
  router,
  dispatch,
  getCitiesFromState,
  setPropertyType,
  setMaxPrice,
  setMinPrice,
  perpage,
  setPerPage
}) => {
  return (
    <div className="listings-pg_filters">
      <h2 className="heading-2 filters-label_main">The Filters</h2>

      <div className="property-types">
        <h3 className="heading-3 filters-label">Property Type</h3>

        <div className="property-type_btns">
          <Image
            src={Housebtn}
            alt="House"
            className={`property-type_btn ${propertyType === 1 ? 'active' : ''}`}
            onClick={() => setProperty(1)}
          />
          <Image
            src={Apartbtn}
            alt="Apartment"
            className={`property-type_btn ${propertyType === 2 ? 'active' : ''}`}
            onClick={() => setProperty(2)}
          />
        </div>
      </div>
      
      <div className="per-page">
        <h3 className="heading-3 filters-label">Per Page</h3>


        <Select
          // default_value={perpage}
          value={perpage}
          onChange={(selectedOption) => {

            const newQuery = {
              ...router.query,
              page: 1,
            };

            const numericValue = Number(selectedOption.value);
            setPerPage(numericValue);
            newQuery.perpage = numericValue;
            debouncedRouterPush(newQuery);

          }}
          options={[
            { name: '8', value: 8 },
            { name: '12', value: 12 },
            { name: '16', value: 16 },
          ]}
          name="perpage"
          id="perpage"
          extraClasses="perpage-select"
        />


      </div>

      <div className="location">
        <h3 className="heading-3 filters-label">Location</h3>

        <Select
          default_value={'All States'}
          value={selectedState}
          onChange={(selectedOption) => {
            /*
              Create a new query object spreading the current query object and setting the page to 1. Then check if selectedOption.id is present. If it is then that means the user has selected a specifc state. If not, then the user has selected 'All States'. In the case of 'All States', set the selected state to an empty string and the stateId to an empty string. Then delete the state key from the query object. And set getCitiesFromState to an empty string so that all the cities are fetched. 
            */
            const newQuery = {
              ...router.query,
              page: 1,
            };
        
            if (selectedOption.id && selectedOption.id !== '0') {
              setSelectedState(selectedOption.name);
              setstateId(selectedOption.id);
              getCitiesFromState(selectedOption.id);
              newQuery.state = selectedOption.id;
            } else {
              setSelectedState('');
              setstateId('');
              getCitiesFromState('');
              delete newQuery.state; // Remove 'state' from query parameters
            }
        
            debouncedRouterPush(newQuery);
          }}
          options={states}
          name="state"
          id="state"
          extraClasses="location-select"
        />

        <Select
          value={selectedCity}
          default_value={'All Cities'}
          onChange={(selectedOption) => {
            setSelectedCity(selectedOption.name);
            setCityId(selectedOption.id);

            /*
              Create a new query object spreading the current query object and setting the page to 1. Then check if selectedOption.id is present. If it is then that means the user has selected a specifc city. If not, then the user has selected 'All Cities'. In the case of 'All Cities', set the selected city to an empty string and the cityId to an empty
            */
            
            const newQuery = {
              ...router.query,
              page: 1,
            };

            if (selectedOption.id && selectedOption.id !== '0') {
              setSelectedCity(selectedOption.name);
              setCityId(selectedOption.id);
              newQuery.city = selectedOption.id;
            }
            else {
              setSelectedCity('');
              setCityId('');
              delete newQuery.city;
            }

            debouncedRouterPush(newQuery);
          }}
          options={cities}
          name="city"
          id="city"
          extraClasses="location-select"
        />
      </div>

      <div className="price-range">
        <h3 className="heading-3 filters-label">Price Range</h3>

        <input
          type="range"
          className="price-range_slider"
          min={0}
          max={500000}
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="range"
          className="price-range_slider max-slider"
          min={0}
          max={500000}
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />

        <div className="price-range_values">
          <input
            type="number"
            name="min"
            className="form-control range-value"
            onChange={handleMinPriceChange}
            value={minPrice}
          />
          <div className="dash"></div>
          <input
            type="number"
            name="max"
            className="form-control range-value"
            onChange={handleMaxPriceChange}
            value={maxPrice}
          />
        </div>
      </div>

      <div className="bedrooms">
        <h3 className="heading-3 filters-label">Bedrooms</h3>

        <ul className="bedroom-list">
          {[1, 2, 3, 4, 5].map((num) => (
            <li
              key={num}
              className={bedsNum === num ? 'active' : ''}
              onClick={() => setBeds(num)}
            >
              {num}
            </li>
          ))}
        </ul>
      </div>

      <div className="bathrooms">
        <h3 className="heading-3 filters-label">Bathrooms</h3>

        <ul className="bathroom-list">
          {[1, 2, 3, 4, 5].map((num) => (
            <li
              key={num}
              className={bathsNum === num ? 'active' : ''}
              onClick={() => setBaths(num)}
            >
              {num}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="btn btn-primary btn-primary-grad mt-12"
        onClick={() => {
          setCityId('');
          setstateId('');
          setSelectedCity('');
          setSelectedState('');
          setPropertyType('');
          setbedsNum('');
          setbathsNum('');
          setMinPrice(0);
          setMaxPrice(500000);
          setPerPage(8);

          router.push({
            pathname: '/admin/listings',
          });
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

