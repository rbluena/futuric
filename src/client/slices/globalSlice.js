import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  notification: null, // {type: 'success', message: 'String'} || { type: 'error', message: {}
  modal: null,
  sidebar: null,
  toggleAuthMenu: false,
  uploadImage: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,

  reducers: {
    toggleLoading: {
      reducer(state, { payload }) {
        if (payload) {
          state.isLoading = payload;
        } else {
          state.isLoading = !state.isLoading;
        }
      },
    },
    toggleAuthMenu: {
      reducer(state, { payload }) {
        if (payload !== undefined) {
          state.toggleAuthMenu = payload;
        } else {
          state.toggleAuthMenu = !state.toggleAuthMenu;
        }
      },
    },
    toggleSidebar: {
      reducer(state, { payload }) {
        if (payload !== undefined) {
          state.sidebar = payload;
        } else {
          state.sidebar = null;
        }
      },
    },
    setNotification: {
      reducer(state, action) {
        state.notification = action.payload;
      },
    },
    clearNotification: {
      reducer(state) {
        state.notification = null;
      },
    },
    openModal: {
      reducer(state, { payload }) {
        state.modal = payload;
      },
    },

    closeModal: {
      reducer(state) {
        state.modal = null;
      },
    },
    resettingGlobalState: {
      reducer: (state) => {
        state.isLoading = false;
        state.modal = null;
        state.notification = null;
        state.toggleAuthMenu = false;
        state.sidebar = false;
      },
    },
    setUploadImage: {
      reducer: (state, { payload }) => {
        state.uploadImage = payload;
      },
    },
  },
});

export const {
  toggleLoading,
  setNotification,
  clearNotification,
  openModal,
  closeModal,
  toggleAuthMenu,
  toggleSidebar,
  resettingGlobalState,
} = globalSlice.actions;

export default globalSlice.reducer;
