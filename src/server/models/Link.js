const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const linkSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    shortenUrl: { type: String }, // Shortened url to be shared to the public.
    longUrl: { type: String }, // Longest link to the original content.
    postUrl: { type: String },
    availableDate: { type: Date }, // The day the link is active for the post/content.
    isActive: { type: Boolean, default: false }, //
    location: { type: String },
    isPrivate: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    topic: { type: String },
    category: { type: String },
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    waitings: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    visits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

linkSchema.plugin(mongooseAggregatePaginateV2);
linkSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Link', linkSchema);
