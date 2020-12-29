const router = require('express').Router();
const authRoutes = require('./auth');
const linksRoutes = require('./links');

router.use('/auth', authRoutes);
router.use('/links', linksRoutes);

module.exports = router;
