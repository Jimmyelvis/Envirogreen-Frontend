import React, { useState, useEffect } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import {
  fetchStates,
  fetchCitiesByState,
  fetchListings,
  createCity
} from '@/reduxstore/slices/listingSlice';
import { useSelector, useDispatch } from 'react-redux';
import withAdmin from '@/components/pages/dashboard/Auth/withAdmin';
import { SelectListGroup } from '@/components/ui/form/SelectListGroup';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { Button } from '@/components/ui/buttons';
import { Panel } from '@/components/ui/Panel';
import { ListingCard } from '@/components/ui/cards/listingCard';
import Image from 'next/image';
import Back_arrow from '@/components/assets/img/arrow-left.svg';
import { imgsrc } from '@/utils/getImgsrc';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';

const Locations = () => {
  const dispatch = useDispatch();
  const { states, cities, adminListings } = useSelector(
    (state) => state.listings
  );

  const [view, setView] = useState('list-locations');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedStateName, setSelectedStateName] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState(null);
  const [createdCity, setCreatedCity] = useState(null);

  // Fallback image URL if no listing image is available
  const staticImg =
    'https://res.cloudinary.com/dwgjvssdt/image/upload/v1731462294/y7k2bf7zx5kiuzvrsmap.png';

  /*
    TODO: Local listings state to hold the listings for the selected state this is because if I select a city that has no listings, and used adminListings.data.length > 0 to whether to display locations-view, it will not appear because adminListings.data.length will be 0. So I will use this local state to hold the listings for the selected state, so now even if a selected city has no listing the locations-view will still appear if the selected state has listings.
  */
  const [localListings, setLocalListings] = useState({
    listings: [],
    total: 0,
  });

  const handleView = (view) => {
    setView(view);
  };

  const renderLocationsView = () => {
    return (
      <>
        <div className="list-locations">
          <div className="filters">
            <h3 className="heading-3 filters-header">Locations</h3>

            <div className="filter-group">
              <SelectListGroup
                name="state"
                default_value={'Select State'}
                value={selectedState}
                options={
                  states &&
                  states.map((state) => ({
                    label: state.name,
                    value: state.id,
                  }))
                }
                onChange={(e) => {
                  dispatch(fetchCitiesByState(e.target.value));
                  setSelectedState(e.target.value);
                  setSelectedStateName(
                    e.target.options[e.target.selectedIndex].text
                  );
                  setSelectedCityName(null);
                }}
              />

              {selectedState && cities && cities.length > 0 && (
                <SelectListGroup
                  name="city"
                  default_value={'Select City'}
                  value={selectedCity}
                  options={
                    cities &&
                    cities.map((city) => ({
                      label: city.name,
                      value: city.id,
                    }))
                  }
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSelectedCity(e.target.value);
                    setSelectedCityName(
                      e.target.options[e.target.selectedIndex].text
                    );
                  }}
                />
              )}
            </div>

            <div className="btn-group">
              <Button
                classes="btn btn-primary-grad"
                onClick={() => {
                  setSelectedState(null);
                  setSelectedStateName(null);
                  setSelectedCityName(null);
                  setSelectedCity(null);
                  setLocalListings({ listings: [], total: 0 });
                }}
              >
                Clear Filters
              </Button>

              <Button
                classes="btn btn-secondary-grad"
                onClick={() => handleView('create-city')}
              >
                Add New City
              </Button>
            </div>
          </div>

          {/**
           * TODO: If we want to display info when a city is selected such as the number of listings in that city, the city name etc, we will likely need to create a separate functuon to first determine if the city has any list listings if, not then we can just display the city name, and keep the image that is already displayed from the selected state. Also right now when we set localListings to adminListings.data, we are just applying the listings return, but we may also need to apply the total and other info that is returned from the api, to localListings state. Which mean localListings will be an object with listings, total, etc. So we maybe do something like this: setLocalListings({listings: adminListings.data, total: adminListings.total, etc}). This way we can access the total listings in the selected city, and display it in the locations-view.
           */}
          <div className="locations-view">
            {selectedState && (
              <>
                <div className="img-header">
                  <div className="img-header_info">
                    <h2 className="heading-2 state-name">
                      {selectedCityName !== null
                        ? selectedCityName
                        : selectedStateName}
                    </h2>

                    <p className="img-header_count">
                      {localListings.total == 1
                        ? localListings.total + ' Listings'
                        : localListings.total + ' Listing'}
                    </p>
                  </div>
                  <div className="overlay"></div>
                  <Image
                    src={
                      localListings?.listings?.length > 0
                        ? imgsrc(localListings?.listings[0])
                        : staticImg
                    }
                    alt=""
                    className="img-header-img"
                    layout="responsive"
                    width={20}
                    height={20}
                  />
                </div>

                <div className="listings">
                  {adminListings?.data?.map((listing) => (
                    <ListingCard listing={listing} key={listing.id} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderCreateView = () => {
    return (
      <div className="create-city">
        <div 
          className="back-btn"
          onClick={() => handleView('list-locations')}
        >
          <Image
            src={Back_arrow}
            alt="Back Arrow"
            className="back-arrow"
            layout="responsive"
            width={20}
            height={20}
          />

          <p>Back</p>
        </div>
        <Sectionheading heading="Add New City" />

        <form>
          <TextFieldGroup
            name="city"
            placeholder="Enter City Name"
            label="City Name"
            value={createdCity}
            onChange={(e) => setCreatedCity(e.target.value)}
          />

          <SelectListGroup
            name="state"
            default_value={'Select State'}
            value={selectedState}
            options={
              states &&
              states.map((state) => ({
                label: state.name,
                value: state.id,
              }))
            }
            onChange={(e) => {
             console.log(e.target.value);
             setSelectedState(e.target.value);
            }}
          />

          <Button 
            classes="btn btn-primary-grad"
            onClick={(e) => {
              e.preventDefault();
              dispatch(createCity({ name: createdCity, state_id: selectedState }));
              setCreatedCity(null);
            }
            } 
          >
            Add City
          </Button>
        </form>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  useEffect(() => {
    if (selectedState) {
      const filters = {
        state: selectedState,
        perpage: 3,
        sort: 'latest-(desc)',
      };
      dispatch(fetchListings(filters));
    }
  }, [selectedState]);

  /*
    TODO: This effect will update the localListings state with the listings from the adminListings state, only when the adminListings state has listings.
  */
  useEffect(() => {
    setLocalListings({
      listings: adminListings.data,
      total: adminListings.total,
    });

    // if (adminListings?.data?.length > 0) {
    //   setLocalListings({
    //     listings: adminListings.data,
    //     total: adminListings.total,
    //   });
    // }
  }, [adminListings]);

  useEffect(() => {
    if (selectedCity) {
      const filters = {
        loc: selectedCity,
        perpage: 3,
        sort: 'latest-(desc)',
      };
      dispatch(fetchListings(filters));
    }
  }, [selectedCity]);

  return (
    <DashLayout>
      <div className="locations">
        {view === 'list-locations' ? renderLocationsView() : renderCreateView()}
      </div>
    </DashLayout>
  );
};

export default Locations;
