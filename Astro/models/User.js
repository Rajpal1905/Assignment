const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  connectedAstrologer: { type: mongoose.Schema.Types.ObjectId, ref: 'Astrologer' },
});
module.exports = mongoose.model('User', userSchema);