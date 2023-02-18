const { Schema, model } = require('mongoose');

const TokenModel = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

module.exports = model('Token', TokenModel);
