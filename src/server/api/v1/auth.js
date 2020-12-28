const passport = require('passport');
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
 * Logging in user using google OAuth
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
  loginHandler
);

router.get('/google/error', (req, res) => res.send('Unknown Error'));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/google/error',
  }),
  loginHandler
);

router.get('/logout', logoutHandler);

module.exports = router;
