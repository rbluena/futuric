import {
  logUserInService,
  registerUserService,
  logUserOutService,
  updateUserService,
} from '@app/services';
import {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUserSuccess,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
} from '@app/slices/authSlice';
import {
  setNotification,
  resettingGlobalState,
  closeModal,
} from '@app/slices/globalSlice';

/**
 * Logout
 *
 * Even if logout api fails, still user should be logged out
 * on the client side.
 *
 * We reset the global state to clear of the data like notifications
 * and loading state.
 */
export function logoutUserAction() {
  return async (dispatch) => {
    dispatch(resettingGlobalState());
    try {
      await logUserOutService();
      dispatch(logoutUserSuccess());
      window.location.href = '/';
    } catch (err) {
      dispatch(logoutUserSuccess());
      window.location.href = '/';
    }
  };
}

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
        type: 'local',
      });
      // dispatch(setNotification({ type: 'success', message }));
      dispatch(loginUserSuccess(data));
      window.location.reload();
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors || err.message,
      };
      // dispatch(setNotification(error));
      dispatch(loginUserFailure());
      throw error;
    }
  };
}

/**
 * Logging user in with Google OAuth2
 * @param {Object} user
 * @param {Object} accessToken
 */
export function signinUserWithGoogleAction(userData) {
  return async (dispatch) => {
    try {
      dispatch(loginUser());

      const { data } = await logUserInService({
        ...userData,
        type: 'google-oauth',
      });

      // dispatch(setNotification({ type: 'success', message }));
      dispatch(loginUserSuccess(data));
      // window.location.reload();
      dispatch(closeModal());
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      // dispatch(setNotification(error));
      dispatch(loginUserFailure());
      throw error;
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
      // window.location.href = '/me/edit';
      dispatch(closeModal());
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      // dispatch(setNotification(error));
      dispatch(registerUserFailure());
      throw error;
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
      dispatch(closeModal());
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(registerUserFailure());
      // dispatch(setNotification(error));
      throw error;
    }
  };
}

export function updateUserAction(userData) {
  return async (dispatch, getState) => {
    try {
      dispatch(updateUser());
      const {
        auth: { token },
      } = getState();

      if (!userData.password || !userData.password.length) {
        delete userData.password;
        delete userData.oldPassword;
      }

      const { message, data } = await updateUserService(token, userData);

      dispatch(updateUserSuccess(data));
      dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(updateUserFailure());
      dispatch(setNotification(error));
    }
  };
}
