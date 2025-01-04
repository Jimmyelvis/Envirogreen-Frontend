import React from 'react';
import { Select } from '@/components/ui/select';
import Image from 'next/image';
import Housebtn from '@/components/assets/img/house-btn.svg';
import Apartbtn from '@/components/assets/img/apart-btn.svg';
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
  setPerPage,
}) => {

  /*
    The getState function will be used to get the name of the state from the states array. It will find by id match to the state id in the query. If it finds a match, it will return the name of the state. If it does not find a match, it will return undefined.
  */
  const getState = () => {
    let state = states.find(
      (state) => state.id === parseInt(router.query.state)
    );

    if (state) {
      return state.name;
    }
  };

  const getCity = () => {
    let city = cities.find((city) => city.id === parseInt(router.query.loc));

    if (city) {
      return city.name;
    }
  };

  return (
    <div className="listings-pg_filters">
      <h2 className="heading-2 filters-label_main">Filters</h2>

      <div className="property-types">
        <h3 className="heading-3 filters-label">Property Type</h3>

        <div className="property-type_btns">
          <Image
            src={Housebtn}
            alt="House"
            className={`property-type_btn ${
              propertyType === 1 ? 'active' : ''
            }`}
            onClick={() => setProperty(1)}
          />
          <Image
            src={Apartbtn}
            alt="Apartment"
            className={`property-type_btn ${
              propertyType === 2 ? 'active' : ''
            }`}
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
          value={selectedState || getState()}
          onChange={(selectedOption) => {
            setSelectedState(selectedOption.name);
            setstateId(selectedOption.id);
            getCitiesFromState(selectedOption.id);
            debouncedRouterPush({
              ...router.query,
              page: 1,
              state: selectedOption.id,
            });
          }}
          options={states}
          name="state"
          id="state"
          extraClasses="location-select"
        />

        <Select
          value={selectedCity || getCity()}
          default_value={'All Cities'}
          onChange={(selectedOption) => {
            setSelectedCity(selectedOption.name);
            setCityId(selectedOption.id);
            debouncedRouterPush({
              ...router.query,
              page: 1,
              loc: selectedOption.id,
            });
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
            pathname: '/listings',
          });
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};
