const mongoose = require('mongoose');

const { Schema } = mongoose;

const linkSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    shortenUrl: { type: String, required: true },
    activationUrl: { type: String },
    activeDate: { type: Date },
    location: { type: String },
    isPrivate: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Link', linkSchema);
