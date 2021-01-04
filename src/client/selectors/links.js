import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state;

const selectMyLinks = (state) => {
  const { myLinks } = state.links;

  const { data, meta } = myLinks;

  return { data: data || {}, meta: meta || {} };
};

// eslint-disable-next-line import/prefer-default-export
export const getLinksStateSelector = createSelector(
  selectSelf,
  (state) => state.links
);

export const myLinksSelector = createSelector(selectMyLinks, (links) => links);
