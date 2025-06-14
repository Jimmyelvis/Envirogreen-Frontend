import React, { useState, useEffect } from 'react';
import { Select } from '@/components/ui/select';
import Image from 'next/image';
import { saveSearch } from '@/reduxstore/slices/userSlice';
import Housebtn from '@/components/assets/img/house-btn.svg';
import Apartbtn from '@/components/assets/img/apart-btn.svg';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { useModal } from '@/components/ui/Modal/hooks/useModal';
import Modal from '@/components/ui/Modal';
import { Panel } from '@/components/ui/Panel';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { Saved_Search_Dialog } from './filters/save_search_dialog';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  logout,
} from '@/reduxstore/slices/userSlice';

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
  routerFilters,
  searchName,
  searchId,
}) => {
  const { modalTarget, origin, openModalTarget, closeModalTarget } = useModal();

  const { data: listings } = useSelector((state) => state.listings.listings);

  const [savedSearchOptions, setSavedSearchOptions] = useState({});

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [hasMounted, setHasMounted] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

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

  const saveSearchOptions = () => {
    let searchImg;

    if (listings.length > 0) {
      if (listings[0].main_photo !== null) {
        searchImg = listings[0].main_photo;
      } else {
        searchImg = listings[0].fullpic_path;
      }
    }

    let searchOptions = {
      img: searchImg,
    };

    /*
      Our Laravel backend expects the following query parameters below
      which are slightly different from the ones that gets set into router.query, so we not only need to get the values from router.query but also need to map them to the correct query parameters that our backend expects.
    */
    Object.keys(router.query).forEach((key) => {
      switch (key) {
        case 'state':
          searchOptions['state_id'] = router.query[key];
          break;
        case 'loc':
          searchOptions['city_id'] = router.query[key];
          break;
        case 'min':
          searchOptions['price_min'] = router.query[key];
          break;
        case 'max':
          searchOptions['price_max'] = router.query[key];
          break;
        case 'beds':
          searchOptions['beds'] = router.query[key];
          break;
        case 'baths':
          searchOptions['baths'] = router.query[key];
          break;
        case 'cat':
          searchOptions['category_id'] = router.query[key];
          break;
        default:
          break;
      }
    });

    setSavedSearchOptions(searchOptions);

    console.log('searchOptions', searchOptions);
  };

  const checkTarget = () => {
    if (modalTarget === 'saveSearch') {
      return (
        <Saved_Search_Dialog
          searchOptions={savedSearchOptions}
          savedSearchName={searchName}
          searchId={searchId}
          debouncedRouterPush={debouncedRouterPush}
        />
      );
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="listings-pg_filters">
      {/* <h2 className="heading-2 filters-label_main">Filters</h2> */}

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
          value={router.query.min || minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="range"
          className="price-range_slider max-slider"
          min={0}
          max={500000}
          value={router.query.max || 500000}
          onChange={handleMaxPriceChange}
        />

        <div className="price-range_values">
          <input
            type="number"
            name="min"
            className="form-control range-value"
            onChange={handleMinPriceChange}
            value={router.query.min || minPrice}
          />
          <div className="dash"></div>
          <input
            type="number"
            name="max"
            className="form-control range-value"
            onChange={handleMaxPriceChange}
            value={router.query.max || maxPrice}
          />
        </div>
      </div>

      <div className="bedrooms">
        <h3 className="heading-3 filters-label">Bedrooms</h3>

        <ul className="bedroom-list">
          {[1, 2, 3, 4, 5].map((num) => (
            <li
              key={num}
              className={router.query.beds == num ? 'active' : ''}
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
              className={router.query.baths == num ? 'active' : ''}
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

      {isAuthenticated && hasMounted && (
        <button
          className="btn btn-secondary btn-secondary-grad mt-12"
          onClick={() => {
            saveSearchOptions();
            openModalTarget('saveSearch', 'saveSearch');
          }}
        >
          Save Search
        </button>
      )}


      <Modal modalTarget={modalTarget} origin={origin} selector={'#root_modal'}>
        {checkTarget()}
      </Modal>
    </div>
  );
};
