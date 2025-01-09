const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true },

  isTopAstrologer: {
    type: Boolean,
    default: false },

  currentConnections: {
    type: Number,
    default: 0 },
    
  maxConnections: {
    type: Number,   
    default: 10 },
});

module.exports = mongoose.model('Astrologer', astrologerSchema);
