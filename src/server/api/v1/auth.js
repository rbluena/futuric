const router = require('express').Router();
const {
  registerHandler,
  userVerificationHandler,
  newVerificationCode,
  loginHandler,
  logoutHandler,
  updateUserHandler,
  deleteTestingUserHandler,
  verifyUserToken,
} = require('../../handlers/auth');
const {
  registerInputValidation,
  authenticate,
  isAuthenticated,
} = require('../../middleware/auth');

/**
 * Registering user using submitted form
 */
router.post('/register', registerInputValidation, registerHandler);

/** Updating user information */
router.put('/update/:id', isAuthenticated, updateUserHandler);

/** Generating new verification token */
router.get('/me', isAuthenticated, verifyUserToken);

/**
 * Verifying user with token sent via email
 */
router.get('/verify', userVerificationHandler);

/**
 * Request new verification code
 */
router.post('/verify/new', newVerificationCode);

/**
 * Logging in user using email and password
 */
router.post('/login', authenticate, loginHandler);

/**
 * Logging user out.
 */
router.get('/logout', logoutHandler);

/**
 * Deleting user
 */
router.delete('/delete-test', deleteTestingUserHandler);

module.exports = router;
