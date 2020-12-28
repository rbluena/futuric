const { update } = require('../models/User');
const User = require('../models/User');

/**
 * Updating user details
 * @param {Object} userData User information
 */
const updateUserService = async (userData) => {
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
    photo: update.photo,
  };

  return updatedUser;
};

module.exports = {
  updateUserService,
};
