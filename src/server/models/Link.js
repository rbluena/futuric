const mongoose = require('mongoose');

const { Schema } = mongoose;

const linkSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    shortenUrl: { type: String }, // Shortened url to be shared to the public
    longUrl: { type: String }, // Longest link to be shared
    availableAt: { type: Date }, // The day the link is active for redirect.
    isActive: { type: Boolean, default: false }, //
    location: { type: String },
    isPrivate: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Link', linkSchema);
