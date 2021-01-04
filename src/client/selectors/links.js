import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state;

const selectMyLinks = (state) => {
  const { myLinks } = state.links;

  const { data, meta } = myLinks;

  return { data: data || {}, meta: meta || {} };
};

export const getLinksStateSelector = createSelector(
  selectSelf,
  (state) => state.links
);

export const selectMyWaitings = (state) => state.links.myWaitings;

export const myLinksSelector = createSelector(selectMyLinks, (links) => links);

export const myWaitingsSelector = createSelector(
  selectMyWaitings,
  (waitings) => waitings
);
