import {
  logUserInService,
  registerUserService,
  logUserOutService,
} from '@app/services';
import {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
} from '@app/slices/authSlice';
import { setNotification, resettingGlobalState } from '@app/slices/globalSlice';

/**
 * Logging in user using form
 * @param {Object} userData
 */
export function logUserInAction(userData) {
  return async (dispatch) => {
    try {
      dispatch(loginUser());
      const { data } = await logUserInService({
        ...userData,
        type: 'google-oauth',
      });
      dispatch(loginUserSuccess(data));
      // dispatch(setNotification({ type: 'success', message }));

      window.location.reload();
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
      dispatch(loginUserFailure());
    }
  };
}

/**
 * Logging user in with Google OAuth2
 * @param {Object} user
 * @param {Object} accessToken
 */
export function logUserInWithGoogleAction(userData) {
  return async (dispatch) => {
    try {
      dispatch(loginUser());

      const { data } = await logUserInService({
        ...userData,
        type: 'google-oauth',
      });

      dispatch(loginUserSuccess(data));
      // dispatch(setNotification({ type: 'success', message }));
      window.location.reload();
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
      dispatch(loginUserFailure());
    }
  };
}

/**
 * Registering user using form
 * @param {Object} userData
 */
export function registerUserAction(userData) {
  return async (dispatch) => {
    dispatch(registerUser());
    try {
      const { data, message } = await registerUserService({
        ...userData,
        type: 'local',
      });
      dispatch(registerUserSuccess(data));
      dispatch(setNotification({ type: 'success', message }));

      // Reloading page to data from the server
      window.location.reload();
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
      dispatch(registerUserFailure());
    }
  };
}

/**
 * Registering user using Google OAuth
 * @param {Object} user
 * @param {String} accessToken
 */
export function signupUserWithGoogleAction(user, accessToken) {
  return async (dispatch) => {
    try {
      dispatch(registerUser());

      const userData = {
        ...user,
        accessToken,
        type: 'google-oauth',
      };

      const { data, message } = await registerUserService(userData);
      dispatch(registerUserSuccess(data));
      dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
      dispatch(registerUserFailure());
    }
  };
}

/**
 * Logging user out of the application
 */
export function logoutUserAction() {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      await logUserOutService(token);
      dispatch(resettingGlobalState());
      window.location.href = process.env.SITE;
    } catch (err) {
      dispatch(logoutUserSuccess());
      window.location.href = process.env.SITE;
    }
  };
}
