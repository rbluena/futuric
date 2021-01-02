const router = require('express').Router();
const { isAuthenticated, isAuthorized } = require('../../middleware/auth');
const { validateLinkData } = require('../../middleware/link');
const {
  newLinkHandler,
  updateLinkHandler,
  deleteLinkHandler,
  getLinkHandler,
  getLinksHandler,
} = require('../../handlers/link');

router.post('/create', isAuthenticated, validateLinkData, newLinkHandler);
router.put('/:id/', isAuthenticated, isAuthorized, updateLinkHandler);
router.delete('/:id', isAuthenticated, isAuthorized, deleteLinkHandler);
router.get('/:id', getLinkHandler);
router.get('/', getLinksHandler);

module.exports = router;
