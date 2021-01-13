const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Getting user by verification token.
 * @param {String} verificationToken
 */
const findUserByVerificationToken = async (verificationToken) =>
  User.findOne({ verificationToken });

/**
 * Find user by username.
 * @param {String} username
 */
const findUserByUsername = async (username) => {
  const doc = await User.findOne({ username });

  if (doc) {
    const user = doc.toObject();
    return user;
  }

  return null;
};

/**
 * Find user by email address.
 * @param {string} email
 */
const findUserByEmail = async (email) => User.findOne({ email });

/**
 * Find user by id
 * @param {String} id
 */
const findUserById = async (id) =>
  User.findOne({ _id: mongoose.Types.ObjectId(id) });

/**
 * Saving user to the database.
 * @param {Object} userData
 */
const createUser = async (userData) => {
  const user = new User(userData);
  const savedUser = await user.save();

  delete savedUser.password;
  delete savedUser.loginStrategy;
  delete savedUser.verificationToken;
  delete savedUser.links;

  return savedUser;
};

/**
 * Updating user details.
 * @param {Object} userData User information
 */
const updateUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  user.firstname = userData.firstname;
  user.lastname = userData.lastname;
  user.address = userData.address;

  if (userData.email) {
    user.email = userData.email;
  }

  if (userData.password) {
    user.password = userData.password;
  }

  const updated = await user.save();

  const updatedUser = {
    _id: updated._id,
    firstname: updated.firstname,
    lastname: updated.lastname,
    username: updated.username,
    brandname: updated.brandname,
    description: updated.description,
    website: updated.website,
    social: updated.social,
    isSuperUser: updated.isSuperUser,
    address: updated.address,
    verified: updated.verified,
    subscription: updated.subscription,
    image: updated.image,
    prominent: updated.prominent,
  };

  return updatedUser;
};

/**
 * Deleting user by email address.
 * @param {String} email
 */
const deleteUserByEmail = async (email) => {
  const deleted = await User.deleteOne({ email });
  return deleted;
};

/**
 * Cheking is authenticated user is the author of the content.
 * @param {String} userId
 * @param {String} linkId
 */
const isUserOwnLinkService = async (userId, linkId) => {
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });

  if (user && user.links.includes(linkId)) {
    return true;
  }

  return false;
};

/**
 * Following user
 *
 * @param {String} followingId
 * @param {String} followedId
 */
const followingUserService = async (followingId, followedId) => {
  const followingUser = await findUserById(followingId);
  const followedUser = await findUserById(followedId);

  let user;

  if (followingUser && followedUser) {
    followingUser.followings.push(followedId);
    followedUser.followers.push(followingId);

    await followingUser.save();
    user = await followedUser.save();

    user = user.toObject();
    user.isFollowing = true;
  }

  return user;
};

/**
 * Unfollow following user
 *
 * @param {String} followingId
 * @param {String} followedId
 */
const unFollowUserService = async (followingId, followedId) => {
  const followingUser = await findUserById(followingId);
  const followedUser = await findUserById(followedId);

  let user;

  if (followingUser && followedUser) {
    followingUser.followings.pull(followedId);
    followedUser.followers.pull(followingId);

    await followingUser.save();
    user = await followedUser.save();

    user = user.toObject();
    user.isFollowing = false;
  }

  return user;
};

const toggleFollowUserService = async (followingId, followedId) => {
  const user = await findUserById(followingId);

  let followedUser;

  if (user) {
    if (user.followings.includes(String(followedId))) {
      // We unfollow user
      followedUser = await unFollowUserService(followingId, followedId);
    } else {
      // we Follow user
      followedUser = await followingUserService(followingId, followedId);
    }
  }

  return followedUser;
};

/**
 * Saving paths to uploaded images
 *
 * @param {Sring} userId
 * @param {Object} data
 */
const userUploadImages = async (userId, data) => {
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  user.image = data;

  console.log(data);

  if (user) {
    const savedData = await user.save();
    // const obj = savedData.toObject();

    const userData = {
      _id: savedData._id,
      firstname: savedData.firstname,
      lastname: savedData.lastname,
      username: savedData.username,
      brandname: savedData.brandname,
      description: savedData.description,
      website: savedData.website,
      social: savedData.social,
      isSuperUser: savedData.isSuperUser,
      address: savedData.address,
      verified: savedData.verified,
      subscription: savedData.subscription,
      image: savedData.image,
      prominent: savedData.prominent,
    };

    return userData;
  }

  throw new Error(
    'There was an error on our side, our team are working on it.'
  );
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  findUserByVerificationToken,
  findUserById,
  createUser,
  updateUser,
  deleteUserByEmail,
  isUserOwnLinkService,
  followingUserService,
  unFollowUserService,
  toggleFollowUserService,
  userUploadImages,
};
