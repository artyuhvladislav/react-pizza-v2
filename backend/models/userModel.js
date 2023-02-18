const { Schema, model } = require('mongoose');

const UserModal = Schema({
  email: { type: String, uniq: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model('User', UserModal);
