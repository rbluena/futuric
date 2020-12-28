const mongoose = require('mongoose');

const {Schema} = mongoose;

const PERMISSIONS = ['ADD', 'EDIT', 'DELETE'];

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    permissions: {type: Array, PERMISSIONS},
  },
  {timestamps: true}
);

module.exports = mongoose.model('Role', userSchema);
