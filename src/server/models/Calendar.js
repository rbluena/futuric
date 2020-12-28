const mongoose = require('mongoose');

const { Schema } = mongoose;

const calendarSchema = new Schema(
  {
    date: { type: Date, required: true },
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace' },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Calendar', calendarSchema);
