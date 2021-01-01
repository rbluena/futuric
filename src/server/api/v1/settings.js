const router = require('express').Router();
const {
  addSettingHandler,
  getSettingsHandler,
} = require('../../handlers/settings');

const { isAuthenticated, isSuperUser } = require('../../middleware/auth');

/**
 * Registering user using submitted form.
 */
router.post('/create', isAuthenticated, isSuperUser, addSettingHandler);

/**
 * Getting application settings for public use
 */
router.get('/', getSettingsHandler);

module.exports = router;
