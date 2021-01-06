const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
// const { validateLinkData } = require('../../middleware/link');
const {
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
  getCommentsHandler,
  getCommentHandler,
  // getLinksHandler,
  // getWaitingsHandler,
  // addWaitingHandler,
  // removeWaitingHandler,
} = require('../../handlers/comments');

router.post('/create', isAuthenticated, createCommentHandler);
router.put('/:id/', isAuthenticated, updateCommentHandler);
router.delete('/:id', isAuthenticated, deleteCommentHandler);
router.get('/:id', getCommentHandler);
router.get('/', getCommentsHandler);
// router.get('/:id', getLinkHandler);
// router.get('/me/waitings', isAuthenticated, getWaitingsHandler);
// router.get('/:id/waitings/add', isAuthenticated, addWaitingHandler);
// router.delete('/:id/waitings/remove', isAuthenticated, removeWaitingHandler);

module.exports = router;
