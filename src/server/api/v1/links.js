const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
const { validateLinkData } = require('../../middleware/todo');
const {
  newLinkHandler,
  updateLinkHandler,
  deleteLinkHandler,
  getLinkHandler,
  getLinksHandler,
} = require('../../handlers/link');

router.post('/create', isAuthenticated, validateLinkData, newLinkHandler);
router.put('/:id/', isAuthenticated, updateLinkHandler);
router.delete('/:id', isAuthenticated, deleteLinkHandler);
router.get('/:id', isAuthenticated, getLinkHandler);
router.get('/', isAuthenticated, getLinksHandler);

module.exports = router;
