const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Player = require('./models/Player');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// POST /player — Create new player
app.post('/player', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /player?name=XYZ — Get a single player
app.get('/player', async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: 'Name query param required' });

  const player = await Player.findOne({ name });
  if (player) {
    res.json(player);
  } else {
    res.status(404).json(null); // No player found
  }
});

// GET /players — (Optional) Get all players
app.get('/players', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
