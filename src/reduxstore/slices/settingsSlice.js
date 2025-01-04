import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAlert } from '@/reduxstore/slices/uiSlice';
import { network } from '@/helpers/constants';

// Aysnc thunk for Fetching homepage settings
export const fetchHomepageSettings = createAsyncThunk(
  'settings/fetchHomepageSettings',
  async () => {
    const response = await fetch(`${network.api}admin/settings`);
    const data = await response.json();
    return data;
  }
);

// Async thunk for changing homepage header
export const changeHomepageHeader = createAsyncThunk(
  'settings/changeHomepageHeader',
  async (url, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}admin/settings/changeheaderimage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ url }),
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
      console.error('Error occurred while adjusting featured blogs:', error);
      dispatch(createAlert('An unexpected error occurred.', 'danger')); // Dispatch a fallback error message
      return rejectWithValue(error.message); // Optionally reject with the error message
    }
  }
);

// Async thunk for changing featured post slots
export const changeFeaturedPostSlots = createAsyncThunk(
  'settings/changeFeaturedPostSlots',
  async (slots, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}admin/settings/featuredpostsslots`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ slots }),
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
      console.error('Error occurred while adjusting featured blogs:', error);
      dispatch(createAlert('An unexpected error occurred.', 'danger')); // Dispatch a fallback error message
      return rejectWithValue(error.message); // Optionally reject with the error message
    }
  }
);

// Async thunk for changing featured listing slots
export const changeFeaturedListingSlots = createAsyncThunk(
  'settings/changeFeaturedListingSlots',
  async (slots, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${network.api}admin/settings/featuredlistingsslots`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ slots }),
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
      console.error('Error occurred while adjusting featured blogs:', error);
      dispatch(createAlert('An unexpected error occurred.', 'danger')); // Dispatch a fallback error message
      return rejectWithValue(error.message); // Optionally reject with the error message
    }
  }
);

const initialState = {
  homepageHeader: null,
  featuredPostSlots: null,
  featuredListingSlots: null,
  status: null,
  editStatus: "idle",
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomepageSettings.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchHomepageSettings.fulfilled, (state, action) => {
      state.homepageHeader = action.payload.header_image;
      state.featuredPostSlots = action.payload.featured_posts_slots;
      state.featuredListingSlots = action.payload.featured_listings_slots;
      state.status = 'success';
    });
    builder.addCase(fetchHomepageSettings.rejected, (state) => {
      state.status = 'failed';
    })
    builder.addCase(changeHomepageHeader.pending, (state) => {
      state.editStatus = 'loading';
    });
    builder.addCase(changeHomepageHeader.fulfilled, (state, action) => {
      state.editStatus = 'success';
      state.homepageHeader = action.payload.image;
    });
    builder.addCase(changeHomepageHeader.rejected, (state) => {
      state.editStatus = 'failed';
    });
  },
});

export const { resetStatus } = settingsSlice.actions;

export default settingsSlice.reducer;
