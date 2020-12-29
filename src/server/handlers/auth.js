const validator = require('validator');
const {
  generateAccessToken,
  comparePassword,
  generateVerificationCode,
} = require('../utils/auth');

const {
  createUser,
  findUserByUsername,
  findUserByVerificationToken,
  deleteUserByEmail,
  findUserByEmail,
  findUserById,
} = require('../services/user');

/**
 * Handling user's registration request.
 *
 * TODO: SEND AN EMAIL
 */
exports.registerHandler = async (req, res, next) => {
  try {
    const { type, email } = req.body;

    let userData;

    // Signing up using email and password
    if (type === 'local') {
      const { username, password } = req.body;

      const usernameFound = await findUserByUsername(username);

      if (usernameFound) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Failed to register.',
          errors: {
            username: 'This username is not available.',
          },
        });
      }

      const verificationToken = generateVerificationCode();

      userData = {
        email,
        username,
        password,
        loginStrategy: type,
        verificationToken,
      };

      await createUser(userData);

      const responseBody = {
        status: 201,
        success: true,
        data: {},
        message:
          'Thank you for registering with us. Check your email for verification.',
      };

      return res.status(201).json(responseBody);
    }
    // signinup with google-oauth
    const { firstname, lastname } = req.body;

    userData = {
      firstname,
      lastname,
      email,
      loginStrategy: type,
      verified: true,
    };

    const user = await createUser(userData);
    const jwt = generateAccessToken(user);

    req.app.jwt = jwt;

    const responseBody = {
      status: 201,
      success: true,
      data: { token: jwt },
      message: 'Thank you for registering with us.',
    };

    return res.status(201).json(responseBody);
  } catch (error) {
    return next(error);
  }
};

/**
 * Handling user verification using link provided to user's email.
 *
 * */
exports.userVerificationHandler = async (req, res, next) => {
  try {
    const verificationToken = req.query.token;
    const user = await findUserByVerificationToken(verificationToken);

    if (user && !user.verified) {
      user.verified = true;
      user.verificationToken = '';

      await user.save();

      return res.status(200).json({
        status: 200,
        data: { verified: true },
        message: 'success',
      });
    }

    return res.status(400).json({
      status: 400,
      message: 'error',
      errors: {
        details: 'Verification is failed, please send new verification token.',
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Send an email with verification token
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

    const user = await findUserByEmail(email);

    if (!user) {
      res.status(422).json({
        status: 422,
        success: false,
        message: 'Bad Request',
        errors: { details: 'You have entered wrong email address.' },
      });
    }

    const verificationToken = generateVerificationCode();
    user.verificationToken = verificationToken;
    await user.save();

    // TODO: SEND EMAIL WITH VERIFICATION TOKEN

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'success',
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Logging user in with email address or google oauth
 */
exports.loginHandler = async (req, res, next) => {
  try {
    const { type, email, password } = req.body;

    const userData = await findUserByEmail(email);
    const user = userData.toObject();

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: {
          email: 'The email address does not exist. You should sign up first.',
        },
      });
    }

    // Using username/email and password to login
    if (type === 'local') {
      // Checking if password is correct password.
      if (!comparePassword(password, user.password)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Bad Request',
          errors: { password: 'You have entered incorrect password!' },
        });
      }
    }

    delete user.password;
    delete user.loginStrategy;
    delete user.verificationToken;
    delete user.links;

    const jwt = await generateAccessToken(user);
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
 *  Verifying user jwt token.
 *  If it passes validation middleware, that is valid token
 */
exports.verifyUserToken = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 200,
      success: true,
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

/**
 * Updating user based ont the ID
 */
exports.updateUserHandler = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: {
          details: 'Failed to update user.',
        },
      });
    }

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    // Updating password
    if (newPassword && newPassword.length > 4) {
      delete user.newPassword;
      delete user.oldPassword;

      // User should confirm password before updating
      if (!comparePassword(oldPassword, user.password)) {
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

      user.password = newPassword;
    }

    const updatedUser = await user.save();

    /** Any further issues preventing to update user */
    if (!updatedUser) {
      throw new Error('Failed to update you data. Please try again later.');
    }

    const jwt = await generateAccessToken(updatedUser.toObject());

    req.app.jwt = jwt;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'User updated successfully',
      data: jwt,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Using this to delete user when writing tests
 */
exports.deleteTestingUserHandler = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      const { email } = req.query;
      await deleteUserByEmail(email);
      res.status(200).json({});
    }
  } catch (error) {
    next(error);
  }
};
