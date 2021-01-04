import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fetching: false,
  links: null,
  myLinks: {},
  createdLink: null,
  activeLink: null,
  analytics: null,
  error: null,
};

const linksSlice = createSlice({
  name: 'links',
  initialState,

  reducers: {
    createLink: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    createLinkSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.createdLink = payload;
      },
    },
    createLinkFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    updateLink: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    updateLinkSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.activeLink = payload;
      },
    },
    updateLinkFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    getLink: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    getLinkSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.activeLink = payload;
      },
    },
    getLinkFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    getAnalytics: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    getAnalyticsSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.activeLink = payload;
      },
    },
    getAnalyticsFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    deleteLink: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    deleteLinkSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.activeLink = payload;
      },
    },
    deleteLinkFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    removeCreatedLink: {
      reducer: (state) => {
        state.createdLink = null;
      },
    },
    getMyLinks: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    getMyLinksSuccess: {
      reducer: (state, { payload }) => {
        console.log('+++++ PAYLOAD ', payload);
        state.myLinks = payload;
      },
    },
    getMyLinksFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
  },
});

export const {
  getLink,
  getLinkSuccess,
  getLinkFailure,
  getAnalytics,
  getAnalyticsSuccess,
  getAnalyticsFailure,
  createLink,
  createLinkSuccess,
  createLinkFailure,
  updateLink,
  updateLinkSuccess,
  updateLinkFailure,
  deleteLink,
  deleteLinkSuccess,
  deleteLinkFailure,
  removeCreatedLink,
  getMyLinksSuccess,
  getMyLinksFailure,
} = linksSlice.actions;

export default linksSlice.reducer;
