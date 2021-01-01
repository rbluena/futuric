const mongoose = require('mongoose');
const { generateHash } = require('../utils/auth');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, min: 4 },
    brandname: { type: String },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      min: 3,
    },
    image: {
      thumbnail: {
        type: String,
      },
      medium: {
        type: String,
      },
    },
    password: { type: String, min: 5 },
    token: { type: String },
    loginStrategy: {
      type: String,
      enum: ['local', 'google-oauth'],
      required: true,
    },
    verified: { type: Boolean, default: false },
    prominent: { type: Boolean, default: false },
    verificationToken: String,
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    isSuperUser: { type: Boolean, default: false },
    address: {
      address: String,
      state: String,
      city: String,
      country: String,
    },
    subscription: {
      isTrial: { type: Boolean, default: false },
      subscribedTo: {
        type: String,
        enum: ['FREE', 'BASIC', 'PREMIUM'],
        default: 'FREE',
      },
    },
    links: [{ type: Schema.Types.ObjectId, ref: 'Links' }],
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  if (user.password) {
    user.password = generateHash(user.password);
  }

  return next();
});

module.exports = mongoose.model('User', userSchema);
