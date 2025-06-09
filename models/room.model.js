const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: String,
  location: String,
  price: Number,
  facilities: [String],
  image: String
});

module.exports = mongoose.model('Room', roomSchema);
