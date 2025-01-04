import { network } from '@/helpers/constants';
import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAlert } from '@/reduxstore/slices/uiSlice';

export const createListing = createAsyncThunk(
  'listings/createListing',
  async (listing, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}admin/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });

      // Check if response is not okay
      if (!response.ok) {
        const errorData = await response.json(); // Await here to get the error details

        if (errorData.errors) {
          errorData.errors.forEach((error) => {
            dispatch(createAlert(error, 'danger'));
          });
        }

        // dispatch(
        //   createAlert(
        //     errorData.error || 'Network response was not right',
        //     'danger'
        //   )
        // ); // Dispatch the error message
        return rejectWithValue(errorData.error); // Reject the thunk with the error message
      }

      const data = await response.json();
      dispatch(createAlert(data.message, 'success'));
      return data;
    } catch (error) {
      console.error('Error occurred while creating listing:', error);
      dispatch(createAlert('An unexpected error occurred.', 'danger')); // Dispatch a fallback error message
      return rejectWithValue(error.message); // Optionally reject with the error message
    }
  }
);

// Async thunk for Updating a listing
export const updateListing = createAsyncThunk(
  'listings/updateListing',
  async (listing, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}admin/listings/${listing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });

      // Check if response is not okay
      if (!response.ok) {
        const errorData = await response.json(); // Await here to get the error details

        if (errorData.errors) {
          errorData.errors.forEach((error) => {
            dispatch(createAlert(error, 'danger'));
          });
        }

        // dispatch(
        //   createAlert(
        //     errorData.error || 'Network response was not right',
        //     'danger'
        //   )
        // ); // Dispatch the error message
        return rejectWithValue(errorData.error); // Reject the thunk with the error message
      }

      const data = await response.json();
      dispatch(createAlert(data.message, 'success'));
      return data;

    } catch (error) {
      console.error('Error occurred while updating listing:', error);
      dispatch(createAlert('An unexpected error occurred.', 'danger')); // Dispatch a fallback error message
      return rejectWithValue(error.message); // Optionally reject with the error message
    }
  }
);



// Async thunk for fetching listings data
// export const fetchListings = createAsyncThunk(
//   'listings/fetchListings',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${network.api}listings`);
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
      
//       return data.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// Async thunk for fetching listings data
export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${network.api}listings/multisearch?${queryParams}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching listings data
export const fetchFeaturedListings = createAsyncThunk(
  'listings/fetchFeaturedListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}listings/featured`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.listings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching listings that are NOT featured
export const fetchNonFeaturedListings = createAsyncThunk(
  'listings/fetchNonFeaturedListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}listings/notfeatured`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a single listing with id in get request
export const fetchListing = createAsyncThunk(
  'listings/fetchListing',
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}listings/${listingId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for searching listings by location
export const searchListings = createAsyncThunk(
  'listings/searchListings',
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}listings/locationsearch/${query}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for searching listings using multiple query parameters
export const muiltisearchListings = createAsyncThunk(
  'listings/searchListings',
  async (params, { rejectWithValue }) => {
    try {

      console.log("params", params);
      
      const response = await fetch(`${network.api}listings/search/${params}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.listings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Async thunk for fetching nearby listings, using the city id
export const fetchNearbyListings = createAsyncThunk(
  'listings/fetchNearbyListings',
  async ({ cityId, excludeId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}listings/nearby/${cityId}/${excludeId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Async thunk for fetching all the Cities
export const fetchCities = createAsyncThunk(
  'listings/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}cities`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.cities;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching Cities by query
export const fetchCitiesByQuery = createAsyncThunk(
  'listings/fetchCitiesByQuery',
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}cities/suggestions/${query}`); // Modify the endpoint to handle search
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.cities;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Async thunk for fetching all the States
export const fetchStates = createAsyncThunk(
  'listings/fetchStates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}states`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.states;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Async thunk for fetching all the Categories
export const fetchCategories = createAsyncThunk(
  'listings/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}categories`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching User Agents
export const fetchUserAgents = createAsyncThunk(
  'listings/fetchUserAgents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}admin/usersagents`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching Cities by State
export const fetchCitiesByState = createAsyncThunk(
  'listings/fetchCitiesByState',
  async (state, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}cities/${state}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.cities;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching Cities with Listings
export const fetchCitiesWithListings = createAsyncThunk(
  'listings/fetchCitiesWithListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}admin/getcitieswithlistings`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching States with Listings
export const fetchStatesWithListings = createAsyncThunk(
  'listings/fetchStatesWithListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}admin/getstateswithlistings`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a count of listings
export const fetchListingsCount = createAsyncThunk(
  'listings/fetchListingsCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}listings/count`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching top 5 cities with listings
export const fetchMostCitiesWithListings = createAsyncThunk(
  'listings/fetchMostCitiesWithListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}admin/getTopCitiesWithListings`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.Per_City;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching latest Listings by query
export const fetchLatestListings = createAsyncThunk(
  'listings/fetchLatestListings',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${network.api}listings?${queryParams}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching Expensive Listings query
export const fetchExpensiveListings = createAsyncThunk(
  'listings/fetchExpensiveListings',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${network.api}listings?${queryParams}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a new city
export const createCity = createAsyncThunk(
  'listings/createCity',
  async (city, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}admin/listings/addcity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(city),
      });

      // Check if response is not okay
      if (!response.ok) {
        const errorData = await response.json(); // Await here to get the error details
        dispatch(createAlert(errorData.error, 'danger')); // Dispatch the error message

        if (errorData.errors) {
          errorData.errors.forEach((error) => {
            dispatch(createAlert(error, 'danger'));
          });

          return rejectWithValue(errorData.errors);
        }

        return rejectWithValue(errorData.error); // Reject the thunk with the error message

      }

      const data = await response.json();
      dispatch(createAlert(data.message, 'success'));

      return data;
    } catch (error) {
      console.error('Error occurred while creating city:', error);
      dispatch(createAlert('An unexpected error occurred.', 'danger')); // Dispatch a fallback error message
      return rejectWithValue(error.message); // Optionally reject with the error message
    }
  }
);

// Async thunk for adjusting featured listings
export const adjustFeaturedListings = createAsyncThunk(
  'listings/adjustFeaturedListings',
  async (listing, { rejectWithValue, dispatch }) => {


    try {
      const response = await fetch(`${network.api}admin/listing/set-featured`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(listing),
      });

      // Check if response is not okay
      if (!response.ok) {
        const errorData = await response.json(); // Await here to get the error details
        dispatch(createAlert(errorData.error, 'danger')); // Dispatch the error message

        if (errorData.errors) {
          errorData.errors.forEach((error) => {
            dispatch(createAlert(error, 'danger'));
          });

          return rejectWithValue(errorData.errors);
        }

        return rejectWithValue(errorData.error); // Reject the thunk with the error message

      }

      const data = await response.json();

      dispatch(createAlert(data.message, 'success'));

      return data;

    } catch (error) {
      console.error('Error occurred while adjusting featured listings:', error);
      dispatch(createAlert('An unexpected error occurred.', 'danger')); // Dispatch a fallback error message
      return rejectWithValue(error.message); // Optionally reject with the error message
    }
  }
);

// Initial state for the listing slice
const initialState = {
  listings: null,
  adminListings: [],
  featuredListings: [],
  searchResults: {},
  singleListing: null,
  status: 'idle',
  creationStatus: 'idle',
  editStatus: 'idle',
  searchStatus: 'idle',
  error: null,
  count: 0,
  cities: [],
  states: [],
  categories: [],
  userAgents: [],
  nearByListings: [],
  nearByListingsCount: 0,
  createdListing: null,
  citiesWithListings: [],
  statesWithListings: [],
  mostCitiesWithListings: [],
  totalNumberOfCitiesWithListing: null,
  totalNumberOfStatesWithListing: null,
  latestListings: [],
  expensiveListings: [],
  createdCity: null,
};

const listingSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setListing: (state, action) => {
      state.singleListing = action.payload;
    },
    setListings: (state, action) => {
      state.listings = action.payload;
      state.status = 'succeeded';
    },
    adjustCites: (state, action) => {
      state.cities = action.payload;
    },
    resetEditStatus: (state) => {
      state.editStatus = 'idle';
    },
    resetCreationStatus: (state) => {
      state.creationStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.listings,
        }
      })
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.adminListings = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchFeaturedListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeaturedListings.fulfilled, (state, action) => {
        state.featuredListings = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchFeaturedListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchListing.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListing.fulfilled, (state, action) => {
        state.singleListing = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchListing.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(searchListings.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchListings.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.searchStatus = 'succeeded';
      })
      .addCase(searchListings.rejected, (state, action) => {
        state.error = action.payload;
        state.searchStatus = 'failed';
      })
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchCitiesByQuery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCitiesByQuery.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCitiesByQuery.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchStates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchCitiesByState.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCitiesByState.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCitiesByState.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchUserAgents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAgents.fulfilled, (state, action) => {
        state.userAgents = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserAgents.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchNearbyListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNearbyListings.fulfilled, (state, action) => {
        state.nearByListings = action.payload.listings;
        state.nearByListingsCount = action.payload.count;
        state.status = 'succeeded';
      })
      .addCase(fetchNearbyListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(createListing.pending, (state) => {
        state.creationStatus = 'loading';
      })
      .addCase(createListing.fulfilled, (state, action) => {
        // state.listings.push(action.payload);
        state.creationStatus = 'succeeded';
        state.createdListing = action.payload.listing;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.error = action.payload;
        state.creationStatus = 'failed';
      })
      .addCase(updateListing.pending, (state) => {
        state.editStatus = 'loading';
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        // state.listings.push(action.payload);
        state.editStatus = 'succeeded';
        state.createdListing = action.payload.listing;
      })  
      .addCase(updateListing.rejected, (state, action) => {
        state.error = action.payload;
        state.editStatus = 'failed';
      })
      .addCase(fetchCitiesWithListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCitiesWithListings.fulfilled, (state, action) => {
        state.citiesWithListings = action.payload.Per_City;
        state.totalNumberOfCitiesWithListing = action.payload.Total_Cities;
        state.status = 'succeeded';
      })
      .addCase(fetchCitiesWithListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchStatesWithListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStatesWithListings.fulfilled, (state, action) => {
        state.statesWithListings = action.payload.Per_State;
        state.totalNumberOfStatesWithListing = action.payload.Total_States;
        state.status = 'succeeded';
      })
      .addCase(fetchStatesWithListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchListingsCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListingsCount.fulfilled, (state, action) => {
        state.count = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchListingsCount.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchMostCitiesWithListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMostCitiesWithListings.fulfilled, (state, action) => {
        state.mostCitiesWithListings = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMostCitiesWithListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchLatestListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLatestListings.fulfilled, (state, action) => {
        state.latestListings = action.payload.listings;
        state.status = 'succeeded';
      })
      .addCase(fetchLatestListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchExpensiveListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpensiveListings.fulfilled, (state, action) => {
        state.expensiveListings = action.payload.listings;
        state.status = 'succeeded';
      })
      .addCase(fetchExpensiveListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(createCity.pending, (state) => {
        state.creationStatus = 'loading';
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.createdCity = action.payload;
        state.creationStatus = 'succeeded';
      })
      .addCase(createCity.rejected, (state, action) => {
        state.error = action.payload;
        state.creationStatus = 'failed';
      })
      .addCase(fetchNonFeaturedListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNonFeaturedListings.fulfilled, (state, action) => {
        state.listings = action.payload.listings;
        state.status = 'succeeded';
      })
      .addCase(fetchNonFeaturedListings.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(adjustFeaturedListings.pending, (state) => {
        state.editStatus = 'loading';
      })
      .addCase(adjustFeaturedListings.fulfilled, (state, action) => {
        state.editStatus = 'succeeded';
        state.singleListing = action.payload.post;
      })
      .addCase(adjustFeaturedListings.rejected, (state, action) => {
        state.error = action.payload;
        state.editStatus = 'failed';
      })
  },
});

export const { setListing, setListings, adjustCites, resetEditStatus, resetCreationStatus } = listingSlice.actions;

export default listingSlice.reducer;
