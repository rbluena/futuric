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