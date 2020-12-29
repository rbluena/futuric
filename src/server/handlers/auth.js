const validator = require('validator.js');
const {
  generateAccessToken,
  comparePassword,
  generateVerificationCode,
} = require('../utils/auth');

const {
  updateUser,
  createUser,
  findUserByUsername,
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

// exports.googleOAuthHandler = async (req, res, next) => {
//   try {
//     const jwt = generateAccessToken(req.user);

//     return res.status(200).json({
//       status: 200,
//       success: true,
//       data: {
//         jwt,
//       },
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

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

        updatedUser = await updateUser({
          ...req.body,
          password: newPassword,
        });
      } else {
        updatedUser = await updateUser(req.body);
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
