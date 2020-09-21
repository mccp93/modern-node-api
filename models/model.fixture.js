const mongoose = require('mongoose');

const team = [
  {
    name: { type: String, required: true },
  },
];

const fixtureSchema = new mongoose.Schema({
  homeTeam: { type: team },
  awayTeam: { type: team },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('fixture', fixtureSchema);
