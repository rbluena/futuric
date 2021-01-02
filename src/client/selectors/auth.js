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

  return null;
};

const selectAuth = (state) => {
  const { token } = state.auth;
  let isAuthenticated = false;
  let user = null;
  let redirectUserToSettings = false;

  if (token && token.length) {
    isAuthenticated = true;
    user = selectUser(state);

    if (user && !user.brandname) {
      redirectUserToSettings = true;
    }
  }

  return { isAuthenticated, user, redirectUserToSettings };
};

const selectProfile = (state) => {
  const { profile } = state.auth;
  let isCurrentUser = false;
  const user = selectUser(state);

  if (user) {
    isCurrentUser = user._id === profile._id;
  }

  return { profile, isCurrentUser };
};

// eslint-disable-next-line import/prefer-default-export
export const getUserSelector = createSelector(selectSelf, selectUser);

export const getProfileSelector = createSelector(selectSelf, selectProfile);

export const getAuthSelector = createSelector(selectSelf, selectAuth);
