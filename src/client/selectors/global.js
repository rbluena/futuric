import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state;

export const modalStateSelector = createSelector(
  selectSelf,
  (state) => state.global.modal
);

export const getGlobalNotification = createSelector(
  selectSelf,
  (state) => state.global.notification || {}
);
