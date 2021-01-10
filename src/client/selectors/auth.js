import { createSelector } from '@reduxjs/toolkit';
import { decode } from 'jsonwebtoken';
import { setBrandAndInitials } from '@app/utils/auth';

const selectSelf = (state) => state;

const selectUser = (state) => {
  const { token } = state.auth;

  if (token && token.length) {
    const user = decode(token);

    setBrandAndInitials(user);

    return user;
  }

  return null;
};

const selectAuth = (state) => {
  let isAuthenticated = false;
  const user = selectUser(state);
  let redirectUserToSettings = false;

  if (user) {
    isAuthenticated = true;

    if (!user.username || user.firstname) {
      // When user signs up with email address, username is created except firstname and lastname
      // When user sign up with google-oauth, username is missing. We should redirect user to setting page
      redirectUserToSettings = true;
    }
  }

  return { isAuthenticated, user, redirectUserToSettings };
};

/**
 * Selecting profile of a user or brand from profile page
 */
const selectProfile = (state) => {
  const { profile } = state.auth;
  let isCurrentUser = false;

  const user = selectUser(state);

  if (user) {
    isCurrentUser = user._id === profile._id;
  } else {
    setBrandAndInitials(profile);
  }

  return { profile, isCurrentUser };
};

// eslint-disable-next-line import/prefer-default-export
export const getUserSelector = createSelector(selectSelf, selectUser);

export const getProfileSelector = createSelector(selectSelf, selectProfile);

export const getAuthSelector = createSelector(selectSelf, selectAuth);
