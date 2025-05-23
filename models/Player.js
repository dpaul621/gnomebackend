const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  level: { type: Number, default: 1 }
});

module.exports = mongoose.model('Player', PlayerSchema);
