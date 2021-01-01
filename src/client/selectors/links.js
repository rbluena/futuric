import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state;

// eslint-disable-next-line import/prefer-default-export
export const getLinksStateSelector = createSelector(
  selectSelf,
  (state) => state.links
);
