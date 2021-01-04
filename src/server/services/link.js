const mongoose = require('mongoose');
const Link = require('../models/Link');
const User = require('../models/User');
const { findUserById } = require('./user');

/**
 * Service to update existing link
 *
 * @param {String} todoId
 * @param {Object} data
 */
const updateLinkService = async (linkId, data) => {
  const doc = await Link.findOne({ _id: linkId });

  Object.keys(data).forEach((key) => {
    if (key === 'availableDate') {
      doc[key] = new Date(data[key]);
    } else {
      doc[key] = data[key];
    }
  });

  const updated = await doc.save();

  if (!updated) {
    throw Error('Something went wrong. Our team are fixing it');
  }
  await updated.populate('owner');

  return updated._doc;
};

/**
 * Service to create new link
 *
 * @param {Object} data
 */
const createLinkService = async (data) => {
  const newLink = new Link(data);
  const savedLink = await newLink.save();

  if (savedLink) {
    const user = await findUserById(data.owner);
    user.links.push(savedLink._id);
    await user.save();
  }

  return savedLink;
};

/**
 * Deleting link based on id.
 * @param {String} linkId
 */
const deleteLinkService = async (linkId) => {
  const deleted = await Link.findByIdAndDelete({ _id: linkId });

  return {
    id: deleted._doc._id,
  };
};

/**
 * Retrieving link based on link id
 * @param {String} linkId
 */
const getLinkByIdService = async (linkId) => {
  const link = await Link.findById(linkId).populate('owner', [
    '_id',
    'brandname',
    'username',
    'prominent',
    'firstname',
    'lastname',
    'followers',
  ]);

  return link;
};

/**
 * Grabing all links for the user.
 * @param {Object} options
 */
const getAllLinksService = async (options) => {
  const match = {};
  const paginateOptions = {};
  const sort = { createdAt: -1 };

  const { limit, page } = options;

  if (limit) {
    paginateOptions.limit = parseInt(limit, 10);
  }

  if (page) {
    paginateOptions.page = parseInt(page, 10);
  }

  if (options.owner) {
    match.owner = mongoose.Types.ObjectId(options.owner);
  }

  const aggregate = Link.aggregate([
    { $match: match },
    { $sort: sort },
    {
      $lookup: {
        from: User.collection.name,
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    { $unwind: '$owner' },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        shortenUrl: 1,
        longUrl: 1,
        postUrl: 1,
        topic: 1,
        category: 1,
        isActive: 1,
        availableDate: 1,
        'owner._id': 1,
        'owner.firstname': 1,
        'owner.lastname': 1,
        'owner.username': 1,
        'owner.email': 1,
        'owner.brandname': 1,
        'owner.website': 1,
        'owner.image': 1,
        'owner.verified': 1,
      },
    },
  ]);

  return Link.aggregatePaginate(aggregate, paginateOptions);
};

// const getTodosFromCalendarsService = async (queries) => {
//   let match = {};
//   const skipTodos = queries.skipTodo || 0;
//   const sliceTodos = queries.sliceTodos || 15;

//   if (queries.workspaceId) {
//     match = {
//       ...match,
//       workspace: mongoose.Types.ObjectId(queries.workspaceId),
//     };
//   }

//   if (queries.from) {
//     match = { ...match, date: { $gte: new Date(queries.from) } };
//   }

//   if (queries.to) {
//     match = { ...match, date: { ...match.date, $lte: new Date(queries.to) } };
//   }

//   const aggrigate = await Calendar.aggregate([
//     {
//       $match: match,
//     },
//     { $limit: 15 },
//     { $sort: { date: 1 } },
//     {
//       $project: {
//         todos: 1,
//         workspace: 1,
//         date: 1,
//         calendar: {
//           date: {
//             $dateToString: { format: '%d', date: '$date' },
//           },
//           month: {
//             $dateToString: { format: '%m', date: '$date' },
//           },
//           year: {
//             $dateToString: { format: '%Y', date: '$date' },
//           },
//         },
//       },
//     },
//     {
//       $lookup: {
//         from: Todo.collection.name,
//         localField: 'todos',
//         foreignField: '_id',
//         as: 'todos',
//       },
//     },
//   ]);

//   Mapping data
//   const todos = aggrigate.map((item) => {
//     item.todos = item.todos.reduce((data, next) => {
//       if (next) {
//         data[next._id] = next;
//       }

//       return data;
//     }, {});

//     return item;
//   });

//   return aggrigate;
// };

module.exports = {
  createLinkService,
  updateLinkService,
  deleteLinkService,
  getLinkByIdService,
  getAllLinksService,
};
