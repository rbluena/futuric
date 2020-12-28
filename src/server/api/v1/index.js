const router = require('express').Router();
const authRoutes = require('./auth');
// const workspaceRoutes = require('./workspace');
// const todoRoutes = require('./todo');

router.use('/auth', authRoutes);
// router.use('/workspaces', workspaceRoutes);
// router.use('/todos', todoRoutes);

module.exports = router;
