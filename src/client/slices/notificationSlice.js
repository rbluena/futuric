import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,

  reducers: {
    toggleWaitingList: {
      // adding and removing from waiting list
      reducer: (state) => {
        state.fetching = true;
      },
    },
    toggleWaitingListSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.activeLink = payload;
      },
    },
    toggleWaitingListFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
  },
});

export const {
  toggleWaitingList,
  toggleWaitingListSuccess,
  toggleWaitingListFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;
