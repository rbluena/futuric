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
const getAllLinksService = async (options, userId) => {
  const match = {};
  const paginateOptions = { limit: 15 };
  let sort = { createdAt: -1 };

  const { limit, page, topic, category, sort: sortQuery } = options;

  if (sortQuery) {
    // Property to be sorted and type to be either ascending or descending
    sort = { [sortQuery.property]: sortQuery.type };
  }

  if (limit) {
    paginateOptions.limit = parseInt(limit, 10);
  }

  if (page) {
    paginateOptions.page = parseInt(page, 10);
  }

  if (options.owner) {
    match.owner = mongoose.Types.ObjectId(options.owner);
  }

  if (category) {
    match.category = { $in: [category] };
  }

  if (topic) {
    match.topic = { $in: [topic] };
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
        waitings: 1,
        isUserWaiting: {
          $in: [
            mongoose.Types.ObjectId(userId),
            { $ifNull: ['$waitings', []] },
          ],
        },
        'owner._id': 1,
        'owner.firstname': 1,
        'owner.lastname': 1,
        'owner.username': 1,
        'owner.email': 1,
        'owner.brandname': 1,
        'owner.website': 1,
        'owner.image': 1,
        'owner.verified': 1,
        waitingsCount: { $size: { $ifNull: ['$waitings', []] } },
        commentsCount: { $size: { $ifNull: ['$comments', []] } },
      },
    },
  ]);

  return Link.aggregatePaginate(aggregate, paginateOptions);
};

/**
 * Retrieving waitings from the list.
 * @param {String} userId
 */
const getWaitingLinksService = async (userId, options = {}) => {
  const paginateOptions = { limit: 15 };
  const { limit, page } = options;

  // const waitings = await Link.find({
  //   waitings: { $in: [mongoose.Types.ObjectId(userId)] },
  // }).populate('owner', 'firstname lastname username brandname prominent');

  if (page) {
    paginateOptions.page = parseInt(page, 10);
  }

  if (limit) {
    paginateOptions.limit = parseInt(limit, 10);
  }

  return Link.paginate(
    {
      waitings: { $in: [mongoose.Types.ObjectId(userId)] },
    },
    { ...paginateOptions, populate: 'owner' }
  );
};

/**
 * Adding link item to the list.
 * @param {String} userId
 * @param {String} linkId
 */
const addWaitingService = async (userId, linkId) => {
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  const link = await Link.findOne({ _id: mongoose.Types.ObjectId(linkId) });

  let savedLink = null;

  if (user && link) {
    user.waitings.push(linkId);
    link.waitings.push(userId);

    await user.save();
    savedLink = await link.save();
  }

  if (savedLink) {
    await Link.populate(savedLink, 'owner');
    await Link.populate(savedLink, 'comments');
    await Link.populate(savedLink, 'waitings');
  }

  const savedObject = savedLink.toObject();

  savedObject.isUserWaiting = true; // Is authenticated user waiting
  savedObject.waitingsCount = savedObject.waitings.length;
  savedObject.commentsCount = savedObject.comments
    ? savedObject.comments.length
    : 0;

  delete savedObject.comments;
  delete savedObject.waitings;
  delete savedObject.owner.followings;
  delete savedObject.owner.followers;
  delete savedObject.owner.password;
  delete savedObject.owner.verificationToken;
  delete savedObject.owner.waitings;
  delete savedObject.owner.links;

  return savedObject;
};

/**
 * Removing item from the list.
 * @param {String} userId
 * @param {String} linkId
 */
const removeWaitingService = async (userId, linkId) => {
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  const link = await Link.findOne({ _id: mongoose.Types.ObjectId(linkId) });

  let removedLink = null;

  if (user && link) {
    user.waitings.pull(linkId);
    link.waitings.pull(userId);
    removedLink = await link.save();
  }

  if (removedLink) {
    await Link.populate(removedLink, 'owner');
    await Link.populate(removedLink, 'comments');
    await Link.populate(removedLink, 'waitings');
  }

  const savedObject = removedLink.toObject();

  savedObject.isUserWaiting = false; // I authenticated user waiting this?
  savedObject.waitingsCount = savedObject.waitings.length;
  savedObject.commentsCount = savedObject.comments
    ? savedObject.comments.length
    : 0;

  delete savedObject.comments;
  delete savedObject.waitings;
  delete savedObject.owner.followings;
  delete savedObject.owner.followers;
  delete savedObject.owner.password;
  delete savedObject.owner.verificationToken;
  delete savedObject.owner.waitings;
  delete savedObject.owner.links;

  return savedObject;
};

module.exports = {
  createLinkService,
  updateLinkService,
  deleteLinkService,
  getLinkByIdService,
  getAllLinksService,
  getWaitingLinksService,
  addWaitingService,
  removeWaitingService,
};
