import { network } from '@/helpers/constants';
import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAlert } from '@/reduxstore/slices/uiSlice';

// Async thunks for contact actions
export const submitContact = createAsyncThunk(
    'contact/submit',
    async (contactData, { dispatch, rejectWithValue }) => {
        try {
            const response = await network.post('/contact', contactData);
            dispatch(createAlert({ type: 'success', message: 'Contact form submitted successfully!' }));
            return response.data;
        } catch (error) {
            dispatch(createAlert({ type: 'error', message: error.response?.data?.message || 'Error submitting contact form' }));
            return rejectWithValue(error.response?.data);
        }
    }
);

export const fetchContacts = createAsyncThunk(
    'contact/fetchAll',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await network.get('/contact');
            return response.data;
        } catch (error) {
            dispatch(createAlert({ type: 'error', message: 'Error fetching contacts' }));
            return rejectWithValue(error.response?.data);
        }
    }
);

export const fetchContact = createAsyncThunk(
    'contact/fetchOne',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await network.get(`/contact/${id}`);
            return response.data;
        } catch (error) {
            dispatch(createAlert({ type: 'error', message: 'Error fetching contact' }));
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateContact = createAsyncThunk(
    'contact/update',
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        try {
            const response = await network.put(`/contact/${id}`, data);
            dispatch(createAlert({ type: 'success', message: 'Contact updated successfully!' }));
            return response.data;
        } catch (error) {
            dispatch(createAlert({ type: 'error', message: 'Error updating contact' }));
            return rejectWithValue(error.response?.data);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contact/delete',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await network.delete(`/contact/${id}`);
            dispatch(createAlert({ type: 'success', message: 'Contact deleted successfully!' }));
            return response.data;
        } catch (error) {
            dispatch(createAlert({ type: 'error', message: 'Error deleting contact' }));
            return rejectWithValue(error.response?.data);
        }
    }
);

// Contact slice
const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contacts: [],
        currentContact: null,
        loading: false,
        error: null,
        submitStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    },
    reducers: {
        resetSubmitStatus: (state) => {
            state.submitStatus = 'idle';
            state.error = null;
        },
        clearCurrentContact: (state) => {
            state.currentContact = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                    ...action.payload.contact,
                };
            })
            // Submit contact form
            .addCase(submitContact.pending, (state) => {
                state.submitStatus = 'loading';
                state.error = null;
            })
            .addCase(submitContact.fulfilled, (state, action) => {
                state.submitStatus = 'succeeded';
                state.contacts.push(action.payload.contact);
            })
            .addCase(submitContact.rejected, (state, action) => {
                state.submitStatus = 'failed';
                state.error = action.payload;
            })
            // Fetch all contacts
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch single contact
            .addCase(fetchContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContact.fulfilled, (state, action) => {
                state.loading = false;
                state.currentContact = action.payload;
            })
            .addCase(fetchContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update contact
            .addCase(updateContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.contacts.findIndex(c => c.id === action.payload.contact.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload.contact;
                }
                state.currentContact = action.payload.contact;
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete contact
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = state.contacts.filter(c => c.id !== action.payload.contact.id);
                if (state.currentContact?.id === action.payload.contact.id) {
                    state.currentContact = null;
                }
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetSubmitStatus, clearCurrentContact } = contactSlice.actions;
export default contactSlice.reducer;

