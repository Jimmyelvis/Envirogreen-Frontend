import React, { useState, useEffect, useCallback } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchListings,
  fetchCitiesByState,
  fetchCities,
} from '@/reduxstore/slices/listingSlice';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons';
import { openModal } from '@/reduxstore/slices/uiSlice';
import Modal  from '@/components/ui/Modal';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { Admin_ListingCard } from '@/components/ui/cards/adminlistingCard';
import { Filters } from '@/components/pages/dashboard/Listings/Filters';
import { Select } from '@/components/ui/Select';
import { Filter_Bubble } from '@/components/ui/Filter_Bubble';

import { useRouter } from 'next/router';
import { Pagination } from '@/components/ui/Pagination';
import { debounce } from '@/utils/debounce';
import { changeBg } from '@/utils/changeBg';
import { squareLoader, fadingDotsLoader } from '@/components/ui/Loaders';
import { createAlert } from '@/reduxstore/slices/uiSlice';
import { useModal } from '@/components/ui/Modal/hooks/useModal';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import { Panel } from '@/components/ui/Panel';

const AdminListings = () => {
  const limit = 115;

  const dispatch = useDispatch();

  // const listings = useSelector((state) => state.listings.listings);

  const {
    data: listings,
    current_page,
    last_page,
    total,
  } = useSelector((state) => state.listings.adminListings);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedsNum, setbedsNum] = useState('');
  const [bathsNum, setbathsNum] = useState('');
  const [cityId, setCityId] = useState('');
  const [stateId, setstateId] = useState('');
  const [routerFilters, setRouterFilters] = useState();
  const [scrolled, setScrolled] = useState(false);
  const [sort, setSort] = useState('latest (desc)');
  const [perPage, setPerPage] = useState(8);

  const [states, setStates] = useState([]);
  const { cities } = useSelector((state) => state.listings);
  const { status } = useSelector((state) => state.listings);

  const { modalTarget, origin, openModalTarget, closeModalTarget } = useModal();
  const modalOpen = useSelector((state) => state.ui.isModalOpen);

  const router = useRouter();

  const paginate = (pageNumber) => {
    router.push({
      pathname: '/admin/listings',
      query: {
        page: pageNumber,
        loc: cityId,
        min: minPrice,
        max: maxPrice,
        cat: propertyType,
        beds: bedsNum,
        baths: bathsNum,
        state: stateId,
        perpage: perPage,
        sort,
      },
    });
  };

  const debouncedRouterPush = useCallback(
    debounce((query) => {
      router.push({
        pathname: 'listings',
        query,
      });
    }, 500),
    []
  );

  const setProperty = (type) => {
    if (propertyType === type) {
      setPropertyType('');
      debouncedRouterPush({
        ...router.query,
        page: 1,
        cat: '',
      });
      return;
    }

    setPropertyType(type);

    debouncedRouterPush({
      ...router.query,
      page: 1,
      cat: type,
    });
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);

    debouncedRouterPush({
      ...router.query,
      page: 1,
      min: value,
    });
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);

    debouncedRouterPush({
      ...router.query,
      page: 1,
      max: value,
    });
  };

  const setBeds = (number) => {
    setbedsNum(number);

    debouncedRouterPush({
      ...router.query,
      page: 1,
      beds: number,
    });
  };

  const setBaths = (number) => {
    setbathsNum(number);

    debouncedRouterPush({
      ...router.query,
      page: 1,
      baths: number,
    });
  };

  const getCitiesFromState = (state) => {
    dispatch(fetchCitiesByState(state));
  };

  const getStates = () => {
    const states = [
      {
        id: 7,
        name: 'Connecticut',
      },
      {
        id: 21,
        name: 'Massachusetts ',
      },
      {
        id: 30,
        name: 'Rhode Island',
      },
      {
        id: 45,
        name: 'Vermont',
      },
      {
        id: 19,
        name: 'Maine',
      },
      {
        id: 29,
        name: 'New Hampshire',
      },
    ];

    setStates(states);
  };

  const selectSortMethod = (sort) => {
    setSort(sort);

    debouncedRouterPush({
      ...router.query,
      page: 1,
      sort,
    });
  };

  const sort_options = [
    {
      value: 'latest-(asc)',
      name: 'latest-(asc)',
    },
    {
      value: 'latest-(desc)',
      name: 'latest-(desc)',
    },
    {
      value: 'price-(asc)',
      name: 'price-(asc)',
    },
    {
      value: 'price-(desc)',
      name: 'price-(desc)',
    },
    {
      value: 'beds-(asc)',
      name: 'beds-(asc)',
    },
    {
      value: 'beds-(desc)',
      name: 'beds-(desc)',
    },
    {
      value: 'baths-(asc)',
      name: 'baths-(asc)',
    },
    {
      value: 'baths-(desc)',
      name: 'baths-(desc)',
    },
    {
      value: 'sqft-(asc)',
      name: 'sqft-(asc)',
    },
    {
      value: 'sqft-(desc)',
      name: 'sqft-(desc)',
    },
  ];

  // Fetch listings when filters change
  useEffect(() => {
    const filters = {
      min: minPrice,
      max: maxPrice,
      state: stateId,
      loc: cityId,
      cat: propertyType,
      beds: bedsNum,
      baths: bathsNum,
      perpage: perPage,
      sort,
      page: router.query.page || 1,
    };

    dispatch(fetchListings(filters));

    console.log('filters', filters);
  }, [
    dispatch,
    minPrice,
    maxPrice,
    selectedState,
    selectedCity,
    propertyType,
    bedsNum,
    bathsNum,
    sort,
    router.query,
    stateId,
    cityId,
    perPage,
  ]);

  const checkTarget = () => {
    if (modalTarget === 'mobile_filters') {
      return (
        <Panel className={'mobile-filters-display'}>
          <Sectionheading_left_bar
            heading={`Total Listings (${total})`}
            subheading={`Listings on this page: ${listings.length}`}
          />

          <Filters
            states={states}
            cities={cities}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setstateId={setstateId}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            setCityId={setCityId}
            setProperty={setProperty}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            handleMinPriceChange={handleMinPriceChange}
            handleMaxPriceChange={handleMaxPriceChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setBeds={setBeds}
            bedsNum={bedsNum}
            setbathsNum={setbathsNum}
            setbedsNum={setbedsNum}
            setBaths={setBaths}
            bathsNum={bathsNum}
            debouncedRouterPush={debouncedRouterPush}
            router={router}
            dispatch={dispatch}
            getCitiesFromState={getCitiesFromState}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </Panel>
      );
    }
  };

  useEffect(() => {
    dispatch(fetchCities());
    getStates();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => changeBg(setScrolled));

    return () => {
      window.removeEventListener('scroll', () => changeBg(setScrolled));
    };
  }, []);

  return (
    <DashLayout>
      <div className="admin-listings">
        <div
          className={
            scrolled
              ? 'mobile-filters mobile-filters-scrolled'
              : 'mobile-filters'
          }
        >
          <button
            className="btn btn-primary-grad mobile-filters-btn"
            onClick={() => {
              openModalTarget('mobile_filters', 'mobile_filters');
              // dispatch(openModal('listings'));
            }}
          >
            Filters
          </button>
        </div>

        <div className="top">
          {status === 'succeeded' && (
            <Sectionheading
              heading={` ${total} Listings`}
              subheading={`Showing ${listings?.length} of ${total} listings`}
            />
          )}

          <Select
            default_value={sort}
            value={sort}
            onChange={(sort) => {
              selectSortMethod(sort.name);
            }}
            options={sort_options}
            name="sort"
            id="sort"
            extraClasses=""
          />
        </div>

        <div className="filters">
          <Filters
            states={states}
            cities={cities}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setstateId={setstateId}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            setCityId={setCityId}
            setProperty={setProperty}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            handleMinPriceChange={handleMinPriceChange}
            handleMaxPriceChange={handleMaxPriceChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setBeds={setBeds}
            bedsNum={bedsNum}
            setbathsNum={setbathsNum}
            setbedsNum={setbedsNum}
            setBaths={setBaths}
            bathsNum={bathsNum}
            dispatch={dispatch}
            getCitiesFromState={getCitiesFromState}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            router={router}
            debouncedRouterPush={debouncedRouterPush}
            perpage={perPage}
            setPerPage={setPerPage}
          />
        </div>

        <div className="listings">
          {status === 'loading' && (
            <div className="loading">{fadingDotsLoader()}</div>
          )}
          {listings?.map((listing) => (
            <Admin_ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        <Pagination
          lastPage={last_page}
          currentPage={current_page}
          paginate={paginate}
        />

      <Modal
        modalTarget={modalTarget}
        origin={origin}
        selector={'#root_modal'}
      >
        {checkTarget()}
      </Modal>
      </div>
    </DashLayout>
  );
};

export default AdminListings;
