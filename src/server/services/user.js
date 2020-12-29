const User = require('../models/User');

/**
 * Getting user by verification token.
 * @param {String} verificationToken
 */
const findUserByVerificationToken = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  return user;
};

/**
 * Find user by username.
 * @param {String} username
 */
const findUserByUsername = async (username) => {
  const user = await User.findOne({ username });

  return user;
};

/**
 * Find user by email address.
 * @param {string} email
 */
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

/**
 * Find user by id
 * @param {String} id
 */
const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

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
    email: updated.email,
    firstname: updated.firstname,
    lastname: updated.lastname,
    address: updated.address,
    verified: updated.verified,
    subscription: updated.subscription,
    photo: updated.photo,
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

module.exports = {
  findUserByEmail,
  findUserByUsername,
  findUserByVerificationToken,
  findUserById,
  createUser,
  updateUser,
  deleteUserByEmail,
};
