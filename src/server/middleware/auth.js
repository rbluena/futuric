const jwt = require('jsonwebtoken');
const { registerValidation } = require('../utils/validation');
const { findUserByEmail } = require('../services/user');

/**
 * Checking if user is authenticated for a route.
 */
exports.isAuthenticated = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader && bearerHeader.length) {
      const jwtClient = bearerHeader.split(' ')[1];

      jwt.verify(jwtClient, process.env.ACCESS_TOKEN_SECRET, (err, docoded) => {
        if (err || !docoded || req.app.jwt !== jwtClient) {
          return res.status(403).json({
            status: 403,
            success: false,
            message: 'error',
            errors: { description: 'You are not logged in, please login!' },
          });
        }

        return next();
      });
    }
    return res.status(403).json({
      status: 403,
      success: false,
      message: 'error',
      errors: [{ description: 'You are not logged in, please login!' }],
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Checking if user is authorized to access a route.
 */
exports.isAuthorized = () => {};

/**
 * Validating user input.
 */
exports.registerInputValidation = async (req, res, next) => {
  try {
    const validatedInfo = await registerValidation(req.body);
    const { email } = validatedInfo;

    const foundUser = await findUserByEmail(email);

    if (foundUser) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Failed to register.',
        errors: {
          email: 'This email address is not available.',
        },
      });
    }

    req.body = validatedInfo;
    return next();
  } catch (error) {
    let err;

    if (error.isJoi) {
      const { details } = error;

      err = {
        status: 400,
        success: false,
        message: 'error',
        errors: { [details[0].context.key]: details[0].message },
      };

      return res.status(400).json(err);
    }
    err = { ...error };

    return next(err);
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};
