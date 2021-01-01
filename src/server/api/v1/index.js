const router = require('express').Router();
const authRoutes = require('./auth');
const linksRoutes = require('./links');
const settingsRoutes = require('./settings');

router.use('/auth', authRoutes);
router.use('/links', linksRoutes);
router.use('/settings', settingsRoutes);

module.exports = router;
