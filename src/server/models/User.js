const mongoose = require('mongoose');
const { generateHash } = require('../utils/auth');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      min: 3,
    },
    photo: {
      thumbnail: {
        type: String,
      },
      medium: {
        type: String,
      },
    },
    password: { type: String, min: 5 },
    token: { type: String },
    loginStrategy: { type: String, enum: ['local', 'google'], required: true },
    varified: { type: Boolean, default: false },
    verificationToken: String,
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    address: {
      address: String,
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
    workspaces: [{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
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
