const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: String,
  level: Number
});

module.exports = mongoose.model('Player', PlayerSchema);
