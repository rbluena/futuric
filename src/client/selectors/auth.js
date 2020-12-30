import { createSelector } from '@reduxjs/toolkit';
import { decode } from 'jsonwebtoken';

const selectSelf = (state) => state;

const selectUser = (state) => {
  const { token } = state.auth;

  if (token && token.length) {
    const user = decode(token);

    if (!user.image) {
      if (!user.brandname) {
        user.initials = 'U';
      } else {
        user.initials = `${user.brandname[0]}`;
      }
    }

    return user;
  }

  return {};
};

// eslint-disable-next-line import/prefer-default-export
export const getUserSelector = createSelector(selectSelf, selectUser);
