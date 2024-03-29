import request from 'axios';
import path from './paths';

/**
 * Handling errors from API
 *
 * @param {Object} error
 */
function errorHandler(error) {
  const { response, message } = error;

  if (!response && message === 'Network Error') {
    throw Error('You are not connected to the internet.');
  } else {
    throw response.data;
  }
}

/**
 * Logging user in with email and password
 *
 * @param {Object} data { email, password }
 */
export const logUserInService = async (data) => {
  try {
    const response = await request({
      method: 'POST',
      url: path.login,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Registering user with email and password
 * @param {Object} data User data. Firstname, Lastname, Email and Password
 */
export const registerUserService = async (data) => {
  try {
    const response = await request({
      method: 'POST',
      url: path.createUser,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Request email verification token
 * @param {Object} data
 */
export const requestVerificationTokenService = async (data) => {
  try {
    const response = await request({
      method: 'POST',
      url: path.requestVerificationToken,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Update user information.
 * @param {Object} data User information
 */
export const updateUserService = async (token, data) => {
  try {
    const response = await request({
      method: 'PUT',
      url: path.updateUser(data._id),
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Uploading user's profile
 *
 * @param {String} token Auth token
 * @param {String} userId User ID
 * @param {Object} data
 * @param {Object} config
 */
export const uploadProfileService = async (token, userId, data, config) => {
  try {
    const response = await request({
      method: 'POST',
      url: path.uploadProfile(userId),
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: config.onUploadProgress,
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Logging user out
 */
export const logUserOutService = async (token) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.logout,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Verifying user's email with token.
 * @param {String} verificationToken
 */
export const verifyUserService = async (verificationToken) => {
  try {
    const respsonse = await request({
      method: 'GET',
      url: path.verifyUser(verificationToken),
    });

    return respsonse.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const getUserProfileService = async (username) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.getProfile(username),
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Service to create a link.
 * @param {Object} data
 */
export const createLinkService = async (token, data) => {
  try {
    const response = await request({
      method: 'POST',
      url: path.createLink,
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Service to update a link.
 *
 * @param {String} token
 * @param {String} id
 * @param {Object} data
 */
export const updateLinkService = async (token, id, data) => {
  try {
    const response = await request({
      method: 'PUT',
      url: path.updateLink(id),
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Service to delete.
 *
 * @param {String} token
 * @param {String} id
 */
export const deleteLinkService = async (token, id) => {
  try {
    const response = await request({
      method: 'DELETE',
      url: path.deleteLink(id),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Retrieving a link based on id
 * @param {String} token
 * @param {String} id
 */
export const getLinkService = async (id) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.getLink(id),
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Retrieving all links conditionally
 * @param {String} token
 * @param {Object} options
 */
export const getLinksService = async (options) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.getLinks,
      params: {
        ...options,
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Retrieving analytics for a link.
 * @param {String} token
 * @param {String} id
 */
export const getLinkAnalyticsService = async (token, id) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.getAnalytics(id),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Current user is following another user.
 *
 * We provide ID of a user who is followed, token on the server
 * will be used to find id of the follower.
 *
 * @param {String} token
 * @param {String} userId ID of the user is followed.
 */
export const toggleFollowService = async (token, userId) => {
  try {
    const response = await request({
      method: 'POST',
      url: path.followUser,
      data: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const getUserWaitingsService = async (token, options = {}) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.getWaitings,
      params: options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Adding link to the waiting list.
 *
 * Once item added, user will receive notification item is updated.
 *
 * @param {String} token
 * @param {String} userId
 * @param {String} linkId
 */
export const addWaitingService = async (token, linkId) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.addWaiting(linkId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Removing link from the waiting list.
 *
 * Once item removed, user will not receive any notification.
 *
 * @param {String} token
 * @param {String} userId
 * @param {String} linkId
 */
export const removeWaitingService = async (token, linkId) => {
  try {
    const response = await request({
      method: 'DELETE',
      url: path.removeWaiting(linkId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Service to create a comment.
 * @param {Object} data
 */
export const createCommentService = async (token, data) => {
  try {
    const response = await request({
      method: 'POST',
      url: path.createComment,
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Service to update a comment.
 *
 * @param {String} token
 * @param {String} id
 * @param {Object} data
 */
export const updateCommentService = async (token, id, data) => {
  try {
    const response = await request({
      method: 'PUT',
      url: path.updateComment(id),
      data: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Service to delete a comment.
 *
 * @param {String} token
 * @param {String} id
 */
export const deleteCommentService = async (token, id) => {
  try {
    const response = await request({
      method: 'DELETE',
      url: path.deleteComment(id),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Retrieving a comment based on its id
 * @param {String} id
 */
export const getCommentService = async (id) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.getComment(id),
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Retrieving all comments conditionally
 * @param {Object} options
 */
export const getCommentsService = async (options = {}) => {
  try {
    const response = await request({
      method: 'GET',
      url: path.getComments,
      params: options,
    });

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};
