const router = require('express').Router();
const authRoutes = require('./auth');
const linksRoutes = require('./links');
const commentsRoutes = require('./comments');
const settingsRoutes = require('./settings');
const mailRoutes = require('./mail');

router.use('/auth', authRoutes);
router.use('/links', linksRoutes);
router.use('/comments', commentsRoutes);
router.use('/settings', settingsRoutes);
router.use('/mail', mailRoutes);

module.exports = router;
