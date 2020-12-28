const router = require('express').Router();
const { isAuthenticated } = require('../../middleware/auth');
const { validateTodoData } = require('../../middleware/todo');
const {
  newTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
  getTodosHandler,
} = require('../../handlers/todo');

router.post('/create', isAuthenticated, validateTodoData, newTodoHandler);
router.put('/:id/', isAuthenticated, updateTodoHandler);
router.delete('/:id/:calendarId', isAuthenticated, deleteTodoHandler);
router.get('/calendar', isAuthenticated, getTodosHandler);

module.exports = router;
