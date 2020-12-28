const mongoose = require('mongoose');

const { Schema } = mongoose;

const workspaceSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String },
    description: { type: String },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: {
          type: String,
          enum: ['ADMIN', 'EDITOR'],
          default: 'ADMIN',
        },
      },
    ],
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workspace', workspaceSchema);
