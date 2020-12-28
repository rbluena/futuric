const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
const { validateWorkspaceData } = require('../../middleware/workspace');
const {
  newWorkspaceHandler,
  updateWorkspaceHandler,
  deleteWorkspaceHandler,
  getWorkspacesHandler,
} = require('../../handlers/workspace');

router.post(
  '/create',
  isAuthenticated,
  validateWorkspaceData,
  newWorkspaceHandler
);

router.put('/:id', isAuthenticated, updateWorkspaceHandler);

router.delete('/:id', isAuthenticated, deleteWorkspaceHandler);

router.get('/', isAuthenticated, getWorkspacesHandler);

module.exports = router;
