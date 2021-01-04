import { decode } from 'jsonwebtoken';
import router from 'next/router';
import {
  getLinkService,
  createLinkService,
  updateLinkService,
  deleteLinkService,
  getLinkAnalyticsService,
  getLinksService,
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
  getMyLinksSuccess,
  getMyLinksFailure,
} from '@app/slices/linksSlice';

import { setNotification } from '@app/slices/globalSlice';

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

export function updateLinkAction(id, linkData) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const { message, data } = await updateLinkService(token, id, linkData);

      dispatch(updateLink());
      dispatch(updateLinkSuccess(data));
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

/**
 * Completly deleting link post from the server
 */
export function deleteLinkAction(id, redirect) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const { message } = await deleteLinkService(token, id);

      if (redirect) {
        router.push('/me/links');
        return;
      }

      dispatch(deleteLink());
      dispatch(deleteLinkSuccess(id));
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

/**
 * Retrieving current user's links has created
 * @param {Object} options Filters eg. limit, page
 */
export function getMyLinksAction(options = {}) {
  return async (dispatch, getState) => {
    try {
      const {
        auth: { token },
        links: { myLinks },
      } = getState();

      if (token) {
        const user = decode(token);

        const { data } = await getLinksService({
          owner: user._id,
          ...options,
        });

        let myNewLinks = {};

        if (myLinks.data && myLinks.data.length > 0) {
          myNewLinks = {
            data: [...myLinks.data, ...data.data],
            meta: data.meta,
          };
        } else {
          myNewLinks = data;
        }
        dispatch(getMyLinksSuccess(myNewLinks));
      }
    } catch (err) {
      dispatch(getMyLinksFailure());
    }
  };
}
