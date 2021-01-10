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

/**
 * @param {Object} ctx
 */
export const handleAuthentication = (ctx) => {
  const { req } = ctx;
  const isAuthenticated = isAutheticated(req);
  let token = null;

  if (isAuthenticated) {
    token = getCookieToken(req);
  }

  return { token, isAuthenticated };
};

/**
 * Setting brandname based on firstname and lastname, since brandname
 * from profile settings is optional.
 *
 * @param {Object} user User/profile information.
 */
export const setBrandAndInitials = (data) => {
  if (!data) {
    return data;
  }

  const user = { ...data };

  // Brandname string
  if (!user.brandname) {
    user.brandname = `${user.firstname} ${user.lastname}`;
  }

  // If user is not having image, we use initials on profile pic.
  if (!user.image || !user.image.thumbnail) {
    if (!user.brandname) {
      user.initials = `${user.firstname[0]} ${user.lastname[0]}`;
    } else {
      user.initials = `${user.brandname[0]}`;
    }
  }

  return user;
};
