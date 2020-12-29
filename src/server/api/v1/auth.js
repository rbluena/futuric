const router = require('express').Router();
const {
  registerHandler,
  userVerificationHandler,
  newVerificationCode,
  loginHandler,
  logoutHandler,
  updateUserHandler,
  // getUserHandler,
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

/**
 * Updating user information
 */
// router.put('/update', isAuthenticated, updateUserHandler);
router.put('/update', isAuthenticated, updateUserHandler);

/** Getting user information */
// router.get('/me', isAuthenticated, getUserHandler);

/**
 * Verifying user with token sent via email
 */
router.get('/verify/:token', userVerificationHandler);

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

module.exports = router;
