const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: String,
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    parentId: { type: mongoose.Types.ObjectId },
    link: { type: mongoose.Types.ObjectId, ref: 'Link' },
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
