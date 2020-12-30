import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state;

// eslint-disable-next-line import/prefer-default-export
export const modalStateSelector = createSelector(
  selectSelf,
  (state) => state.global.modal
);
