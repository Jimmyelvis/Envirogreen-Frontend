import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Layout from '@/components/ui/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@/reduxstore/store';
import { network } from '@/helpers/constants';
import {
  setListings,
  fetchCities,
  fetchCitiesByState,
  adjustCites,
} from '@/reduxstore/slices/listingSlice';
import { openModal } from '@/reduxstore/slices/uiSlice';
import { Sectionheading_left_bar } from '@/components/ui/headings/Sectionheading_left_bar';
import Housebtn from '@/components/assets/img/house-btn.svg';
import Apartbtn from '@/components/assets/img/apart-btn.svg';
import Wht_Close_btn from '@/components/assets/img/close-wht-btn.svg';
import Image from 'next/image';
import { Select } from '@/components/ui/select';
import { ListingCard } from '@/components/ui/cards/listingCard';
import { useRouter } from 'next/router';
import { Filter_Bubble } from '@/components/ui/Filter_Bubble';
import { Filters } from '@/components/pages/listing/Filters';
import { Pagination } from '@/components/pages/listing/Pagination';
import { debounce } from '@/utils/debounce';
import { changeBg } from '@/utils/changeBg';
import { Panel } from '@/components/ui/Panel';
import { squareLoader, fadingDotsLoader, circleLoader } from '@/components/ui/Loaders';
import { createAlert } from '@/reduxstore/slices/uiSlice';
import Modal from '@/components/ui/Modal';


const Listings = () => {
  const limit = 115;
  const router = useRouter();
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState(router?.query?.cat || '');
  const [bedsNum, setbedsNum] = useState(router?.query?.beds || '');
  const [bathsNum, setbathsNum] = useState(router);
  const [cityId, setCityId] = useState(router?.query?.loc || '');
  const [stateId, setstateId] = useState(router?.query?.state || '')
  const [routerFilters, setRouterFilters] = useState();
  const [scrolled, setScrolled] = useState(false);
  const [sort, setSort] = useState("latest (desc)")
  const [perPage, setPerPage] = useState(8)



  ;


  const {
    data: listings,
    current_page,
    last_page,
    total,
  } = useSelector((state) => state.listings.listings);
  const { cities } = useSelector((state) => state.listings);
  const { status } = useSelector((state) => state.listings);

  const [states, setStates] = useState([]);

  /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
  const [modalTarget, setModalTarget] = useState(null);

  /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
  const checkTarget = () => {
    if (modalTarget === 'mobile_filters') {
      return (
        <Panel className={'mobile-filters-display'}>
          <Sectionheading_left_bar
            heading={`Total Listings (${total})`}
            subheading={
              `Listings on this page: ${listings.length}`}
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

  const debouncedRouterPush = useCallback(
    debounce((query) => {
      router.push({
        pathname: '/listings',
        query,
      });
    }, 500),
    []
  );

  const paginate = (pageNumber) => {
    router.push({
      pathname: '/listings',
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

  const getCitiesFromState = (state) => {
    dispatch(fetchCitiesByState(state));
  };

  const getCitiesForListings = () => {
    dispatch(fetchCities());
  };

  const selectSortMethod = (sort) => {

    setSort(sort);

    debouncedRouterPush({
      ...router.query,
      page: 1,
      sort,
    });
    
  }

  const sort_options = [
    {
      value: "latest-(asc)",
      name: "latest-(asc)",
    },
    {
      value: "latest-(desc)",
      name: "latest-(desc)",
    },
    {
      value: "price-(asc)",
      name: "price-(asc)",
    },
    {
      value: "price-(desc)",
      name: "price-(desc)",
    },
    {
      value: "beds-(asc)",
      name: "beds-(asc)",
    },
    {
      value: "beds-(desc)",
      name: "beds-(desc)",
    },
    {
      value: "baths-(asc)",
      name: "baths-(asc)",
    },
    {
      value: "baths-(desc)",
      name: "baths-(desc)",
    },
    {
      value: "sqft-(asc)",
      name: "sqft-(asc)",
    },
    {
      value: "sqft-(desc)",
      name: "sqft-(desc)",
    },
 
  ]



  /*
    Renders filter bubbles based on the current filters applied in the router's query parameters. 

    If the filter is not applied, then the filter bubble will not be rendered. 

    If the filter is applied, then the filter bubble will be rendered with the filter value and an onClick function that will remove the filter from the query parameters.
  */
  const renderRouterFilters = () => {
    if (routerFilters) {
      const filterList = Object.keys(routerFilters).map((key) => {
        if (key === 'page') {
          return;
        }

        if (key === "searchid") {
          return;
        }

        if (key === 'loc') {
          if (selectedCity === '' && routerFilters[key] === '') {
            return;
          }

          if (selectedCity === 'All Cities') {
            return;
          }

          let city = cities.find((city) => city.id === parseInt(router?.query?.loc));

          return (
            <Filter_Bubble
              key={key}
              filter={selectedCity || city?.name}
              onClickFn={() => {
                setSelectedCity('');
                setCityId('');
                debouncedRouterPush({
                  ...router.query,
                  page: 1,
                  loc: '',
                });
              }}
            />
          );
        }

        if (key === 'state') {
          if (selectedState === '' && routerFilters[key] === '') {
            return;
          }

          if (selectedState === 'All States') {
            return;
          }

          let state = states.find((state) => state.id === parseInt(router?.query?.state));

          return (
            <Filter_Bubble
              key={key}
              filter={selectedState || state?.name}
              onClickFn={() => {
                setSelectedState('');
                setstateId('');
                debouncedRouterPush({
                  ...router.query,
                  page: 1,
                  state: '',
                });
              }}
            />
          );
        }

        if (key === 'cat') {
          if (propertyType === '') {
            return;
          }
          return (
            <Filter_Bubble
              key={key}
              filter={propertyType === 1 ? 'House' : 'Apartment'}
              onClickFn={() => {
                setPropertyType('');
                debouncedRouterPush({
                  ...router.query,
                  page: 1,
                  cat: '',
                });
              }}
            />
          );
        }

        if (key === 'searchname') {
          return (
            <Filter_Bubble
              key={key}
              dark
              noClose
              filter={
                <>
                  Editing:{' '}
                  {routerFilters[key]}
                </>
              }
              
            />
          );
        }

        // if key value is not equal to null or "" then return the key value pair
        if (routerFilters[key]) {
          return (
            <Filter_Bubble
              key={key}
              filter={
                <>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                  {routerFilters[key]}
                </>
              }
              onClickFn={() => {
                if (key === 'min') {
                  setMinPrice(0);
                }

                if (key === 'max') {
                  setMaxPrice(500000);
                }

                if (key === 'beds') {
                  setbedsNum('');
                }

                if (key === 'baths') {
                  setbathsNum('');
                }

                debouncedRouterPush({
                  ...router.query,
                  page: 1,
                  [key]: '',
                });
              }}
            />
          );
        }
      });

      return filterList;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => changeBg(setScrolled));

    return () => {
      window.removeEventListener('scroll', () => changeBg(setScrolled));
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCities());
    getStates();
  }, []);

  useEffect(() => {
    const {
      page,
      loc = cityId,
      state = stateId,
      min = 0,
      max = maxPrice,
      beds = bedsNum,
      baths = bathsNum,
      cat = '',
      perpage = perPage,
      sort,
    } = router.query;

    console.log('router.query:', router.query);

    setRouterFilters(router.query);

    fetchListingsData(page || 1, loc, state, min, max, beds, baths, cat, perpage, sort);
  }, [router.query]);

  const fetchListingsData = useCallback(
    debounce(async (page = 1, loc, state, min, max, beds, baths, cat, perpage, sort ) => {
      try {
        const queryParams = new URLSearchParams({
          page,
          loc,
          state,
          min,
          max,
          beds,
          baths,
          cat,
          perpage,
          sort,
        });


        const response = await fetch(
          `${network.api}listings/multisearch?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        dispatch(setListings(data));
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    }, 500), // 500ms debounce delay
    []
  );

  const renderListings = () => {
    return listings?.map((listing) => {
      return <ListingCard key={listing.id} listing={listing} />;
    });
  };

  

  return (
    <Layout>
      <div className="listing-pg">
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
              setModalTarget('mobile_filters');
              dispatch(openModal('listings'));
            }}
          >
            Filters
          </button>
        </div>

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
          perpage={perPage}
          setPerPage={setPerPage}
          searchName={router.query.searchname}
          searchId={router.query.searchid}
        />

        <div className="listings-pg_listings-section">

          <div className="top">
            {/* {status === 'succeeded' && (
              <Sectionheading_left_bar
                heading={`Total Listings (${total})`}
                subheading={`Listings on this page: ${listings?.length}`}
              />
            )} */}

            <Sectionheading_left_bar
              heading={
                `Total ${status === "succeeded" ? total : 0 } Listings`
              } 
              subheading={`Listings on this page: 
                ${status === "succeeded" ? listings?.length : 0 }`
              }
            />

            <Select
              default_value={sort}
              value={sort}
              onChange={(sort) => {
                selectSortMethod(sort.name);
              }}
              options={sort_options}
              name="sort"
              id="sort"
              extraClasses="select-sort"
            />
          </div>

          <div className="filters-applied">{renderRouterFilters()}</div>

          <div className="listings">
            {
              status === 'loading' 
                && (
                <div className="loading">
                  {circleLoader()}
                </div>
              )
            }
            {
              renderListings()
            }
          </div>

          <Pagination
            lastPage={last_page}
            currentPage={current_page}
            paginate={paginate}
          />
        </div>
      </div>

      <Modal
        modalTarget={modalTarget}
        origin="listings"
        selector={'#root_modal'}
      >
        {checkTarget()}
      </Modal>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      const page = query.page || 1;
      const loc = query.loc || ''; // Ensure loc has a default value
      const min = query.min || 0; // Ensure min has a default value
      const max = query.max || 500000; // Ensure max has a default value
      const beds = query.beds || ''; // Ensure beds has a default value
      const baths = query.baths || ''; // Ensure baths has a default value
      const cat = query.cat || ''; // Ensure cat has a default value
      const perpage = query.perpage || 8; // Ensure perpage has a default value
      const sort = query.sort || 'latest (desc)'; // Ensure sort has a default value

      try {
        const queryParams = new URLSearchParams({
          page,
          loc,
          min,
          max,
          beds,
          baths,
          cat,
          perpage,
          sort
        });
        const response = await fetch(
          `${network.api}listings/multisearch?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const data = await response.json();
        console.log('data:', data);

        console.log('called');
        store.dispatch(setListings(data));
      } catch (error) {
        console.error('Failed to fetch listings:', error);
        return {
          props: { error: error.message },
        };
      }
      return {
        props: {},
      };
    }
);

export default Listings;
