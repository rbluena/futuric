const passport = require('passport');
const jwt = require('jsonwebtoken');
const { OAuth2Strategy } = require('passport-google-oauth');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { registerValidation } = require('../utils/validation');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  'google',
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ email: profile.email });

        if (existingUser) {
          done(null, existingUser);
        }

        const newUser = new User({
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          photo: {
            medium: profile.image.url,
          },
          token: accessToken,
          verified: false,
          loginStrategy: 'google',
        });

        await newUser.save();

        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

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
    } else {
      return res.status(403).json({
        status: 403,
        success: false,
        message: 'error',
        errors: [{ description: 'You are not logged in, please login!' }],
      });
    }
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

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: { email: 'Email is already exists.' },
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

    next(err);
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};
