import {
  getLinkService,
  createLinkService,
  updateLinkService,
  deleteLinkService,
  getLinkAnalyticsService,
} from '@app/services';

import {
  getLink,
  getLinkSuccess,
  getLinkFailure,
  getAnalytics,
  getAnalyticsSuccess,
  getAnalyticsFailure,
  createLink,
  createLinkSuccess,
  createLinkFailure,
  updateLink,
  updateLinkSuccess,
  updateLinkFailure,
  deleteLink,
  deleteLinkSuccess,
  deleteLinkFailure,
} from '@app/slices/linksSlice';

import { setNotification } from '@app/slices/globalSlice';
import { decode } from 'jsonwebtoken';

/**
 * Retreiving a link based on link's id
 * @param {String} linkdId
 */
export function getLinkAction(linkdId) {
  return async (dispatch, getState) => {
    try {
      dispatch(getLink());
      const { token } = getState().auth;

      const { message, data } = await getLinkService(token, linkdId);
      dispatch(getLinkSuccess(data));
      dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      dispatch(getLinkFailure());
      // const error = {
      //   type: 'error',
      //   message: err.errors,
      // };
      // dispatch(setNotification(error));
    }
  };
}

export function createLinkAction(linkData) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const user = decode(token);

      const { message, data } = await createLinkService(token, {
        ...linkData,
        owner: user._id,
      });

      dispatch(createLink(data));
      dispatch(createLinkSuccess(data));
      dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      dispatch(createLinkFailure());
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
    }
  };
}

export function updateLinkAction(linkData) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const { message, data } = await updateLinkService(token, linkData);

      dispatch(updateLink(data));
      dispatch(updateLinkSuccess());
      dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      dispatch(updateLinkFailure());
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
    }
  };
}

export function deleteLinkAction(linkData) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const { message, data } = await deleteLinkService(token, linkData);

      dispatch(deleteLink(data));
      dispatch(deleteLinkSuccess());
      dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      dispatch(deleteLinkFailure());
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
    }
  };
}

/**
 * Retrieving analytics based on link's id
 * @param {String} linkdId
 */
export function getAnalyticsAction(linkdId) {
  return async (dispatch, getState) => {
    try {
      dispatch(getAnalytics());
      const { token } = getState().auth;

      const { message, data } = await getLinkAnalyticsService(token, linkdId);
      dispatch(getAnalyticsSuccess(data));
      dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      dispatch(getAnalyticsFailure());
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
    }
  };
}
