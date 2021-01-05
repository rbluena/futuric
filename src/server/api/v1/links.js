const router = require('express').Router();
const { isAuthenticated, isAuthorized } = require('../../middleware/auth');
const { validateLinkData } = require('../../middleware/link');
const {
  newLinkHandler,
  updateLinkHandler,
  deleteLinkHandler,
  getLinkHandler,
  getLinksHandler,
  getWaitingsHandler,
  addWaitingHandler,
  removeWaitingHandler,
} = require('../../handlers/link');

router.post('/create', isAuthenticated, validateLinkData, newLinkHandler);
router.put('/:id/', isAuthenticated, isAuthorized, updateLinkHandler);
router.delete('/:id', isAuthenticated, isAuthorized, deleteLinkHandler);
router.get('/', getLinksHandler);
router.get('/:id', getLinkHandler);
router.get('/me/waitings', isAuthenticated, getWaitingsHandler);
router.get('/:id/waitings/add', isAuthenticated, addWaitingHandler);
router.delete('/:id/waitings/remove', isAuthenticated, removeWaitingHandler);

module.exports = router;
