const {
  createOrUpdateService,
  updateTodoService,
  deleteTodoService,
  getTodosFromCalendarsService,
  // getTodosByWorkspaceService,
} = require('../services/todo');

/**
 * Request handler for creating new todo.
 */
exports.newTodoHandler = async (req, res, next) => {
  try {
    const doc = await createOrUpdateService(req.body, req.body.positionIndex);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'New todo was created successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for updating a todo.
 */
exports.updateTodoHandler = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const doc = await updateTodoService(todoId, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Todo was updated successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for updating a todo.
 */
exports.deleteTodoHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { calendarId } = req.params;

    const doc = await deleteTodoService(id, calendarId);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Todo was updated successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for getting all todos.
 */
exports.getTodosHandler = async (req, res, next) => {
  try {
    const documents = await getTodosFromCalendarsService(req.query);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Here the list of todos.',
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};
