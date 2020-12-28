const { omit } = require('lodash');
const mongoose = require('mongoose');
const Calendar = require('../models/Calendar');
const Todo = require('../models/Todo');

mongoose.set('debug', true);

/**
 * Service to update existing todo
 *
 * @param {String} todoId
 * @param {Object} data
 */
const updateTodoService = async (todoId, data) => {
  const doc = await Todo.findOne({ _id: todoId });

  Object.keys(data).forEach((key) => {
    doc[key] = data[key];
  });

  const updated = await doc.save();

  if (!updated) {
    throw Error('Something went wrong. Our team are fixing it');
  }

  return updated._doc;
};

/**
 * Updating or creating todo if not existing.
 *
 * @param {Object} data Todo item
 */
const createOrUpdateService = async (data) => {
  const isValidId = mongoose.Types.ObjectId.isValid(data._id);

  let savedTodo = null;

  if (isValidId) {
    // Updating existing todo
    savedTodo = await updateTodoService(data._id, data);
  } else {
    // Adding new todo
    const todoWithOutId = omit(data, '_id');
    const newTodo = new Todo(todoWithOutId);
    const saved = await newTodo.save();
    savedTodo = saved._doc;

    if (!savedTodo) {
      throw Error('Failed to save todo.');
    }

    // Adding to the calendar
    const foundCalendar = await Calendar.findOne({
      workspace: data.workspace,
      date: data.date,
    });

    if (foundCalendar) {
      // Adding to the existing calendar
      foundCalendar.todos.splice(data.positionIndex, 0, savedTodo._id);
      await foundCalendar.save();
    } else {
      // Creating new calendar
      const calendarData = {
        date: data.date,
        workspace: mongoose.Types.ObjectId(data.workspace),
      };

      const newCalendar = new Calendar(calendarData);
      newCalendar.todos.push(savedTodo._id);
      await newCalendar.save();
    }
  }

  return savedTodo;
};

/**
 * Service to create new todo
 *
 * TODO: Calendar should be moved to its own service
 *
 * @param {String | ObjectId} userId Authenticated user
 * @param {Object} data Name, color and description of the workspace
 */
const createTodoService = async (data) => {
  data.workspace = data.workspaceId;

  const newTodo = new Todo(data);
  const savedTodo = await newTodo.save();

  if (!savedTodo) {
    throw Error('Failed to save todo.');
  }

  const foundCalendar = await Calendar.findOne({
    workspace: data.workspace,
    date: data.date,
  });

  let savedCalendar;

  if (foundCalendar) {
    foundCalendar.todos.splice(data.positionIndex, 0, savedTodo._id);
    savedCalendar = await foundCalendar.save();
  } else {
    const calendarData = {
      date: data.date,
      workspace: mongoose.Types.ObjectId(data.workspace),
    };

    const newCalendar = new Calendar(calendarData);
    newCalendar.todos.push(savedTodo._id);
    savedCalendar = await newCalendar.save();
  }

  if (!savedCalendar) {
    throw Error('Failed to save calendar.');
  }

  return {
    todo: savedTodo._doc,
    calendar: {
      _id: savedCalendar._id,
      date: savedCalendar.date,
    },
  };
};

/**
 * Deleting todo based on id.
 *
 * TODO: Calendar methods should be moved to its own service
 *
 * @param {String} todoId
 * @param {Object} data
 */
const deleteTodoService = async (todoId, calendarId) => {
  const deleted = await Todo.findByIdAndDelete({ _id: todoId });

  if (!deleted) {
    throw Error('There was an error while deleting item. We are working on it');
  }

  const foundCalendar = await Calendar.findOne({ _id: calendarId });

  if (!foundCalendar) {
    throw Error('There was an error while deleting item. We are working on it');
  }

  const position = foundCalendar.todos.indexOf(todoId);

  if (position !== -1) {
    if (foundCalendar.todos.length <= 1) {
      // Delete the whole calendar
      await Calendar.findByIdAndDelete({ _id: calendarId });
    } else {
      // Delete only selected todo.
      foundCalendar.todos.splice(position, 1);
      const removed = await foundCalendar.save();

      if (!removed) {
        throw Error(
          'There was an error while deleting item. We are working on it'
        );
      }
    }
  }

  return {
    todoId: deleted._doc._id,
    calendarId: foundCalendar._id,
  };
};

/**
 * Returning todos base on
 * @param {Object} queries
 */
const getTodosFromCalendarsService = async (queries) => {
  let match = {};
  const skipTodos = queries.skipTodo || 0;
  const sliceTodos = queries.sliceTodos || 15;

  if (queries.workspaceId) {
    match = {
      ...match,
      workspace: mongoose.Types.ObjectId(queries.workspaceId),
    };
  }

  // if (queries.from) {
  //   match = { ...match, date: { $gte: new Date(queries.from) } };
  // }

  // if (queries.to) {
  //   match = { ...match, date: { ...match.date, $lte: new Date(queries.to) } };
  // }

  const aggrigate = await Calendar.aggregate([
    {
      $match: match,
    },
    { $limit: 15 },
    { $sort: { date: 1 } },
    {
      $project: {
        todos: 1,
        workspace: 1,
        date: 1,
        calendar: {
          date: {
            $dateToString: { format: '%d', date: '$date' },
          },
          month: {
            $dateToString: { format: '%m', date: '$date' },
          },
          year: {
            $dateToString: { format: '%Y', date: '$date' },
          },
        },
      },
    },
    {
      $lookup: {
        from: Todo.collection.name,
        localField: 'todos',
        foreignField: '_id',
        as: 'todos',
      },
    },
  ]);

  // Mapping data
  // const todos = aggrigate.map((item) => {
  //   item.todos = item.todos.reduce((data, next) => {
  //     if (next) {
  //       data[next._id] = next;
  //     }

  //     return data;
  //   }, {});

  //   return item;
  // });

  return aggrigate;
};

module.exports = {
  createOrUpdateService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
  getTodosFromCalendarsService,
};
