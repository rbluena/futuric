import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fetching: false,
  links: {},
  myLinks: {},
  myWaitings: [],
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
    getLinks: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    getLinksSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = true;
        state.links = payload;
      },
    },
    getLinksFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    getLink: {
      reducer: (state) => {
        state.fetching = false;
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
        state.myLinks = payload;
      },
    },
    getMyLinksFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    getMyWaitingsSuccess: {
      reducer: (state, { payload }) => {
        state.myWaitings = payload;
      },
    },
    toggleWaiting: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    toggleWaitingSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.links = payload;
      },
    },
    toggleWaitingFailure: {
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
  getLinks,
  getLinksSuccess,
  getLinksFailure,
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
  getMyWaitingsSuccess,
  toggleWaiting,
  toggleWaitingSuccess,
  toggleWaitingFailure,
} = linksSlice.actions;

export default linksSlice.reducer;
