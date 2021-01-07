import { isEmpty } from 'lodash';
import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state;

const selectLinks = (state) => {
  const { links } = state.links;
  const { data, meta } = links;

  if (isEmpty(data)) {
    return { data: [], meta: {} };
  }

  return { data, meta };
};

const selectMyLinks = (state) => {
  const { myLinks } = state.links;
  const { data, meta } = myLinks;

  if (isEmpty(data)) {
    return { data: [], meta: {} };
  }

  return { data, meta };
};

export const getLinksStateSelector = createSelector(
  selectSelf,
  (state) => state.links
);

export const selectWaitings = (state) => {
  const { waitings } = state.links;
  const { data, meta } = waitings;

  if (isEmpty(data)) {
    return { data: [], meta: {} };
  }

  return { data, meta };
};

export const linksSelector = createSelector(selectLinks, (links) => links);

export const myLinksSelector = createSelector(selectMyLinks, (links) => links);

export const waitingsSelector = createSelector(
  selectWaitings,
  (waitings) => waitings
);
