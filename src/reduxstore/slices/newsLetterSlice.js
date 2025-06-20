import { network } from '@/helpers/constants';
import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAlert } from '@/reduxstore/slices/uiSlice';

// Async thunks for newsLetter actions
export const submitNewsLetter = createAsyncThunk(
  'newsLetter/submit',
  async (newsLetterData, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${network.api}newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newsLetterData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          errorData.errors.forEach((error) => {
            dispatch(createAlert(error, 'danger'));
          });
        }
        dispatch(
          createAlert(
            errorData.error || 'Network response was not right',
            'danger'
          )
        );
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      dispatch(createAlert(data.message, 'success'));
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error submitting newsLetter';
      dispatch(createAlert({ type: 'error', message: errorMessage }));
      return rejectWithValue(error.response?.data);
    }
  }
);

const newsLetterSlice = createSlice({
  name: 'newsLetter',
  initialState: {
    loading: false,
    error: null,
    email: '',
    submitStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    resetSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.newsLetter,
      };
    });
    builder
      .addCase(submitNewsLetter.pending, (state) => {
        state.submitStatus = 'loading';
        state.error = null;
      })
      .addCase(submitNewsLetter.fulfilled, (state, action) => {
        state.submitStatus = 'succeeded';
        state.email = action.payload.email;
      })
      .addCase(submitNewsLetter.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetSubmitStatus } = newsLetterSlice.actions;
export default newsLetterSlice.reducer;
