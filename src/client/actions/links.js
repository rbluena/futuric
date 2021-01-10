import { decode } from 'jsonwebtoken';
import router from 'next/router';
import { isEmpty } from 'lodash';
import { mergeUpdatedItem } from '@app/utils/common';
import {
  getLinkService,
  createLinkService,
  updateLinkService,
  deleteLinkService,
  getLinkAnalyticsService,
  getLinksService,
  getUserWaitingsService,
  addWaitingService,
  removeWaitingService,
} from '@app/services';

import {
  getLink,
  getLinkSuccess,
  getLinkFailure,
  getLinks,
  getLinksSuccess,
  getLinksFailure,
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
  toggleWaiting,
  toggleWaitingFailure,
  getWaitings,
  getWaitingsSuccess,
  getWaitingsFailure,
} from '@app/slices/linksSlice';

import { setNotification } from '@app/slices/globalSlice';

import { logoutUserAction } from '@app/actions';

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

/**
 * Retrieving links from the server
 * @param {Object} options Query options
 */
export function getLinksAction(options = {}) {
  return async (dispatch, getState) => {
    dispatch(getLinks());

    try {
      const {
        auth: { token },
        links: { links: oldLinks },
      } = getState();

      if (token) {
        // Get more related links based on user followings/subscription.
      }

      const { data } = await getLinksService(options);
      let links = {};

      if (oldLinks.data && oldLinks.data.length > 0) {
        links = {
          data: [...oldLinks.data, ...data.data],
          meta: data.meta,
        };
      } else {
        links = data;
      }

      dispatch(getLinksSuccess(links));
    } catch (error) {
      dispatch(getLinksFailure());
    }
  };
}

/**
 * Adding or removing item from waiting list.
 * @param {String} linkId ID of a link post that user is adding to waiting list
 * @param {String} type Either "add" or "remove". Either adding or removing items from list
 */
export function toggleWaitingAction(linkId, type) {
  return async (dispatch, getState) => {
    dispatch(toggleWaiting());
    let data = null;

    try {
      const {
        auth: { token },
        links: { links, waitings, activeLink },
      } = getState();

      if (type === 'add') {
        ({ data } = await addWaitingService(token, linkId));
      }

      if (type === 'remove') {
        ({ data } = await removeWaitingService(token, linkId));
      }

      if (data) {
        if (!isEmpty(activeLink)) {
          dispatch(getLinkSuccess(data));
        }

        if (links.data && links.data.length) {
          const updatedLinks = mergeUpdatedItem(links.data, data);
          dispatch(getLinksSuccess({ data: updatedLinks, meta: links.meta }));
        }

        if (waitings.data && waitings.data.length) {
          const updatedWaitings = mergeUpdatedItem(waitings.data, data, true);
          dispatch(
            getWaitingsSuccess({ data: updatedWaitings, meta: waitings.meta })
          );
        }
      }
    } catch (error) {
      if (error.status === 403) {
        dispatch(logoutUserAction());
        return;
      }
      dispatch(toggleWaitingFailure());
    }
  };
}

export function getWaitingsAction(options) {
  return async (dispatch, getState) => {
    dispatch(getWaitings());

    try {
      const {
        auth: { token },
        links: { waitings },
      } = getState();

      const { data } = await getUserWaitingsService(token, options);
      let newWaitings = {};

      if (waitings.data && waitings.data.length > 0) {
        newWaitings.data = [...waitings.data, ...data.data];
        newWaitings.meta = data.meta;
      } else {
        newWaitings = data;
      }
      dispatch(getWaitingsSuccess(newWaitings));
    } catch (error) {
      dispatch(getWaitingsFailure());
    }
  };
}
