const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    text: { type: String, default: '' },
    date: { type: Date, required: true },
    type: { type: String, enum: ['TODO'], default: 'TODO' },
    description: { type: String },
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    isChild: { type: Boolean, default: false },
    previous: { type: Schema.Types.ObjectId, default: null }, // Previous sibling
    next: { type: Schema.Types.ObjectId, default: null }, // Next sibling
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
