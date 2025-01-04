import { network } from '@/helpers/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { createAlert } from '@/reduxstore/slices/uiSlice';



// Async thunk for fetching staff data
export const fetchStaff = createAsyncThunk('staff/fetchStaff', async (staffId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${network.api}staff/${staffId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Async thunk for fetching all staff data
export const fetchAllStaff = createAsyncThunk('staff/fetchAllStaff', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${network.api}staff`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// async thunk for updating staff data
export const updateStaff = createAsyncThunk('staff/updateStaff', async (staffData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${network.api}staff/${staffData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(staffData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// async thunk for getting all roles
export const fetchRoles = createAsyncThunk('staff/fetchRoles', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${network.api}admin/roles`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// async thunk for changing user role, using this Larvel 11 route: admin/staff/{id}/role
export const changeRole = createAsyncThunk('staff/changeRole', async ({ userId, roleId }, { rejectWithValue, dispatch }) => {

    const role = { role_id: roleId };

    try {
        const response = await fetch(`${network.api}admin/staff/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Await here to get the error details

            if (errorData.errors) {
                errorData.errors.forEach((error) => {
                  dispatch(createAlert(error, 'danger'));
                });
              }


            // throw new Error('Network response was not ok')
            return rejectWithValue(errorData.error); // Reject the thunk with the error message
        }


        const data = await response.json();
        dispatch(createAlert(data.message, 'success'));
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const initialState = {
  staff: [],
  staffProfile: {},
  staffStatus: 'idle',
  staffError: null,
  roles: {
    count: 0,
    roles: [], 
  },
};


const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setAllStaff: (state, action) => {
            state.staff = action.payload;
        },
        setStaffProfile: (state, action) => {
            state.staffProfile = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
              return {
                ...state,
                ...action.payload.staff,
              };
            })
            .addCase(fetchStaff.pending, (state) => {
                state.staffStatus = 'loading';
            })
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.staffStatus = 'succeeded';
                state.staffProfile = action.payload;
            })
            .addCase(fetchStaff.rejected, (state, action) => {
                state.staffStatus = 'failed';
                state.staffError = action.payload;
            })
            .addCase(fetchAllStaff.pending, (state) => {
                state.staffStatus = 'loading';
            })
            .addCase(fetchAllStaff.fulfilled, (state, action) => {
                state.staffStatus = 'succeeded';
                state.staff = action.payload;
            })
            .addCase(fetchAllStaff.rejected, (state, action) => {
                state.staffStatus = 'failed';
                state.staffError = action.payload;
            })
            .addCase(updateStaff.pending, (state) => {
                state.staffStatus = 'loading';
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                state.staffStatus = 'succeeded';
                state.staffProfile = action.payload;
            })
            .addCase(updateStaff.rejected, (state, action) => {
                state.staffStatus = 'failed';
                state.staffError = action.payload;
            })
            .addCase(fetchRoles.pending, (state) => {
                state.staffStatus = 'loading';
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.staffStatus = 'succeeded';
                state.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.staffStatus = 'failed';
                state.staffError = action.payload;
            })
            .addCase(changeRole.pending, (state) => {
                state.staffStatus = 'loading';
            })
            .addCase(changeRole.fulfilled, (state, action) => {
                state.staffStatus = 'succeeded';
                state.staffProfile = action.payload;
            })
            .addCase(changeRole.rejected, (state, action) => {
                state.staffStatus = 'failed';
                state.staffError = action.payload;
            });

    }
});

export const { setAllStaff, setStaffProfile } = staffSlice.actions;

export default staffSlice.reducer;