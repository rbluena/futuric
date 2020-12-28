const validator = require('validator.js');
const {
  generateAccessToken,
  comparePassword,
  generateVerificationCode,
} = require('../utils/auth');

const { updateUserService } = require('../services/user');
const User = require('../models/User');

/**
 * Handling user's registration request.
 *
 * TODO: SEND AN EMAIL
 */
exports.registerHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, type } = req.body;

    const jwt = generateAccessToken({
      firstname,
      lastname,
      email,
      verified: false,
    });

    const verificationToken = generateVerificationCode();

    const user = new User({
      firstname,
      lastname,
      email,
      password,
      verificationToken,
      loginStrategy: type,
      loggedIn: true,
    });

    await user.save();

    /** Log user in */
    const responseBody = {
      status: 201,
      success: true,
      message:
        'Thank you for registering with us. Check your email for verification.',
      data: {
        jwt,
      },
    };

    return res.status(201).json(responseBody);
  } catch (error) {
    return next(error);
  }
};

/**
 * Handling user verification using link provided from email.
 *
 * */
exports.userVerificationHandler = async (req, res, next) => {
  try {
    const verificationToken = req.params.token;
    const user = User.findOne({ verificationToken });

    if (user && !user.verified) {
      await user.updateOne(
        { verificationToken },
        { verificationToken: '', verified: true }
      );

      return res.status(200).json({
        status: 200,
        message: 'success',
      });
    }

    return res.status(400).json({
      status: 400,
      message: 'error',
      errors: {
        details:
          'Verification is failed, please request new verification code.',
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Send an email with verification token
 *
 * TODO: SEND THE TOKEN VIA EMAIL
 */
exports.newVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: { details: 'Invalid email address used.' },
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(422).json({
        status: 422,
        success: false,
        message: 'Bad Request',
        errors: { details: 'You have entered wrong password.' },
      });
    }

    const verificationToken = generateVerificationCode();
    user.verificationToken = verificationToken;
    await user.save();

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'success',
    });
  } catch (error) {
    return next(error);
  }
};

exports.loginHandler = async (req, res, next) => {
  try {
    let jwt;
    // If user signed in with google aouth
    if (req.user) {
      const { user } = req;
      jwt = generateAccessToken({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        verified: user.verified,
        photo: user.photo,
      });
    } else {
      const { email, password } = req.body;
      const userExists = await User.findOne({ email });

      // Is user existing
      if (!userExists) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Bad Request',
          errors: { email: 'Email you entered does not exists!' },
        });
      }

      // Is it a correct password
      if (!comparePassword(password, userExists.password)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Bad Request',
          errors: { password: 'You have entered incorrect password!' },
        });
      }
      const user = {
        id: userExists.id,
        firstname: userExists.firstname,
        lastname: userExists.lastname,
        email: userExists.email,
        verified: userExists.verified,
        address: userExists.address,
        subscription: userExists.subscription,
        photo: userExists.photo,
      };

      jwt = await generateAccessToken(user);
    }

    req.app.jwt = jwt;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'You are logged in successfully.',
      data: { jwt },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Logging user out
 */
exports.logoutHandler = async (req, res, next) => {
  try {
    req.app.jwt = null;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'You have been logged out successfully',
    });
  } catch (error) {
    return next(error);
  }
};

exports.googleOAuthHandler = async (req, res, next) => {
  try {
    const jwt = generateAccessToken(req.user);

    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        jwt,
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateUserHandler = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, email } = req.body;
    const userExists = await User.findOne({ email });
    delete req.body.oldPassword;
    delete req.body.newPassword;

    let updatedUser;

    if (userExists) {
      // Is user changing password?
      if (oldPassword.length > 4 && newPassword.length > 4) {
        if (!comparePassword(oldPassword, userExists.password)) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: 'Bad Request',
            errors: {
              password:
                'You are changing password, and you have entered incorrect password!',
            },
          });
        }

        updatedUser = await updateUserService({
          ...req.body,
          password: newPassword,
        });
      } else {
        updatedUser = await updateUserService(req.body);
      }
    }

    if (updatedUser) {
      const jwt = await generateAccessToken(updatedUser);

      req.app.jwt = jwt;

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'User updated successfully',
        data: jwt,
      });
    }

    throw new Error('Failed to update you data. Please try again later.');
  } catch (error) {
    return next(error);
  }
};
