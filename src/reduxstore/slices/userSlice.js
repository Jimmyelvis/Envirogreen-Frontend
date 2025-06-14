import { network } from '@/helpers/constants';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { createAlert } from '@/reduxstore/slices/uiSlice';

// Async thunk for fetching user data
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}users/${userId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(`${network.api}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      let data = await response.json();
      if (response.ok) {
        thunkAPI.dispatch(createAlert('Login successful', 'success'));
        return data;
      } else {
        thunkAPI.dispatch(
          createAlert(data.message || 'Login failed', 'danger')
        );
        return thunkAPI.rejectWithValue(data.message || 'Login failed');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
  }
);

// Async thunk for logging out a user
// export const logoutUser = createAsyncThunk(
//   'user/logoutUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${network.api}logout`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        dispatch(logout());
        return;
      } else {
        return rejectWithValue('Logout failed');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(`${network.api}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      let data = await response.json();
      if (response.ok) {
        thunkAPI.dispatch(
          createAlert('Registration successful you may now login', 'success')
        );
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message || 'Registration failed');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const getUsersWishlist = createAsyncThunk(
  'user/getUsersWishlist',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${network.api}user/wishlist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message || 'Failed to get wishlist');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const getUserSaves = createAsyncThunk(
  'user/getUserSaves',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${network.api}user/saved-searches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message || 'Failed to get saves');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const saveSearch = createAsyncThunk(
  'user/saveSearch',
  async (searchData, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}user/saved-searches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(searchData),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(createAlert('Save created', 'success'));
        return data;
      } else {
        return rejectWithValue(data.message || 'Failed to save search');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const updateSaveSearch = createAsyncThunk(
  'user/updateSaveSearch',
  async ({id, searchOptions}, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}user/saved-searches/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(searchOptions),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(createAlert('Save updated', 'success'));
        return data;
      } else {
        return rejectWithValue(data.error || 'Failed to update save');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);




export const deleteuserSave = createAsyncThunk(
  'user/deleteuserSave',
  async (saveId, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}user/saved-searches/${saveId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(createAlert('Save deleted', 'success'));
        return data;
      } else {
        return rejectWithValue(data.message || 'Failed to delete save');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const updateWishlist = (propertyId, actionType) =>  (dispatch) => {

  dispatch(updateUserWishlist({ propertyId, actionType }));
  // dispatch(createAlert('Wishlist updated', 'success'));
}



const initialState = {
  user: null,
  token: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  userWishList: [],
  userSaves: [],
};

// Initialize state from local storage
const persistedState =
  typeof window !== 'undefined'
    ? {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
      }
    : {};

const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialState, ...persistedState },
  reducers: {
    logout(state) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.userWishList = [];
    },
    resetStatus(state) {
      state.status = 'idle';
    },
  updateUserWishlist(state, action) {
    const { propertyId, actionType } = action.payload;
    if (actionType === 'added') {
      state.user.push({ property_id: propertyId });
    }
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
        state.error = null;
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUsersWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userWishList = action.payload;
      })
      .addCase(getUsersWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUserSaves.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserSaves.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userSaves = action.payload.data;
      })
      .addCase(getUserSaves.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteuserSave.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteuserSave.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userSaves = state.userSaves.filter(
          (save) => save.id !== action.payload.id
        );
      })
      .addCase(deleteuserSave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateSaveSearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
  },
});

export const selectIsAuthenticated = (state) => !!state.user.token;
export const selectCurrentUser = (state) => state.user.user;

export const { logout, resetStatus,updateUserWishlist } = userSlice.actions;
export default userSlice.reducer;
