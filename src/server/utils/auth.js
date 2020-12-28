const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Generate jwt access token.
 *
 * @param {object} data User information
 */
exports.generateAccessToken = (data) =>
  jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

/**
 * Converting string to hash
 *
 * @param {string} data String to hashed
 */
exports.generateHash = (data) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(data, salt);
};

/**
 * Comparing password aginst hash
 *
 * @param {string} password Plain password
 * @param {strng} hash Hashed password
 */
exports.comparePassword = (password, hash) =>
  bcrypt.compareSync(password, hash);

exports.generateVerificationCode = () =>
  crypto
    .createHash('sha256')
    .update(process.env.ACCESS_TOKEN_SECRET)
    .digest('hex');
