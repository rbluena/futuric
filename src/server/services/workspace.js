const mongoose = require('mongoose');
const { isEmpty } = require('lodash');
const Workspace = require('../models/Workspace');
const User = require('../models/User');

/**
 * Service to create new workspace
 *
 * @param {String | ObjectId} userId Authenticated user
 * @param {Object} data Name, color and description of the workspace
 */
const createWorkspaceService = async (userId, data) => {
  const newWorkspace = new Workspace(data);

  newWorkspace.members.push({
    user: mongoose.Types.ObjectId(userId),
  });

  const saved = await newWorkspace.save();
  const doc = saved._doc;

  if (saved) {
    const updated = await User.updateOne(
      { _id: userId },
      { $push: { workspaces: doc._id } }
    );

    if (!updated) {
      throw Error('Failed to create workspace.');
    }
  }

  if (!saved) {
    throw Error('Failed to create workspace.');
  }

  return doc;
};

/**
 * Updating workspace based on id
 *
 * @param {String} userId
 * @param {Object} data
 */
const updateWorkspaceService = async (workspaceId, data) => {
  const doc = await Workspace.findOne({
    _id: mongoose.Types.ObjectId(workspaceId),
  });

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
 * Deleting workspace based on id
 *
 * TODO: Deleted item should be scheduled to be deleted after sometime.
 *
 * @param {String} userId
 * @param {Object} data
 */
const deleteWorkspaceService = async (workspaceId) => {
  const doc = await Workspace.findOne({ _id: workspaceId });
  doc.deleted = true;
  const deleted = await doc.save();

  if (!deleted) {
    throw Error('Something went wrong. Our team are fixing it');
  }

  return deleted._doc._id;
};

/**
 * Retrieving workspaces
 *
 * @param {String} userId
 * @param {Object} options
 */
const getWorkspacesService = async (queries, userId = null) => {
  let options = { deleted: false, archived: false }; // Returning workspaces which are not deleted and not archived

  if (userId) {
    options = {
      ...options,
      'members.user': { $in: [mongoose.Types.ObjectId(userId)] },
    };
  }

  const documents = await Workspace.find(options);

  return documents.reduce((data, next) => {
    data[next._id] = next;
    return data;
  }, {});
};

/**
 * Retrieving workspaces based on id of the user
 *
 * @param {String} userId
 * @param {Object} queries
 */
const getWorkspacesByUserService = async (userId, queries) => {
  // By default returning workspaces which are not deleted and not archived
  let options = {
    'members.user': { $in: [mongoose.Types.ObjectId(userId)] },
  };

  if (!isEmpty(queries)) {
    options = { ...options, ...queries };
  }

  const documents = await Workspace.find(options).lean();

  return documents.reduce((data, next) => {
    data[next._id] = next;
    return data;
  }, {});
};

module.exports = {
  createWorkspaceService,
  updateWorkspaceService,
  deleteWorkspaceService,
  getWorkspacesService,
  getWorkspacesByUserService,
};
