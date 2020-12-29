import { getCookieToken } from '@app/utils/session';
import { redirectTo } from './common';

/**
 * Checking if user is authenticated,
 *
 * @param {Object} req Request object
 */
// eslint-disable-next-line import/prefer-default-export
export const isAutheticated = (req) => {
  let token = null;

  if (process.browser) {
    token = getCookieToken();
  } else {
    token = getCookieToken(req);
  }

  // console.log(`token: `, token);

  if (token && token.length) {
    return true;
  }
  return false;
};

/**
 * Protecting route.
 *
 * @param {Object} ctx Servier side context/
 */
export const protectedRoute = (ctx) => {
  const { req, res } = ctx;

  if (!isAutheticated(req)) {
    redirectTo('/auth/login', res);
  }
};

export const handleAuthentication = (ctx) => {
  const { req } = ctx;
  const isAuthenticated = isAutheticated(req);
  let token = null;

  if (isAuthenticated) {
    token = getCookieToken(req);
  }

  return { token, isAuthenticated };
};
