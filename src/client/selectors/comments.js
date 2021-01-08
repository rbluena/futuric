import { createSelector } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const commentsStateSelector = createSelector(
  (state) => state.comments,
  (state) => state
);
