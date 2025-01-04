import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

// Thunk for setting an alert with a timeout
export const createAlert = (msg, alertType, timeout = 4000) => dispatch => {
  const id = uuidv4();
  dispatch(setAlert({ msg, alertType, id }));

  setTimeout(() => {
    dispatch(removeAlert(id));
  }, timeout);
};

const initialState = {
  mobileBgOn: false,
  isModalOpen: false,
  modalContent: "",
  alerts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileBgOn: (state, action) => {
      state.mobileBgOn = true;
    },
    setMobileBgOff: (state, action) => {
      state.mobileBgOn = false;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
      state.modalContent = "";
    },
    setAlert: (state, action) => {
      // const id = uuidv4(); // Generate a unique ID for the alert
      
      const { msg, alertType, id } = action.payload; // Destructure payload
      state.alerts.push({ msg, alertType, id }); // Push new alert directly
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload); // Remove alert by ID
    },
    clearAlerts: (state) => {
      state.alerts = []; // Clear all alerts
    },
  },
});

export const { setMobileBgOn, setMobileBgOff, openModal, closeModal, setAlert, removeAlert, clearAlerts } = uiSlice.actions;

export default uiSlice.reducer;