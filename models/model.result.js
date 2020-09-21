const mongoose = require('mongoose');
const { find } = require('lodash');
const Schema = mongoose.Schema;

const result = [
  {
    goals: {
      type: Number,
      required: true,
      min: [0, 'Must have at least 0 goals'],
    },
    goal_scorers: [
      {
        scorer: [
          {
            name: { type: String },
            timeScored: { type: String, min: 0, max: 130 },
          },
        ],
      },
    ],
  },
];

const resultSchema = new mongoose.Schema({
  homeScore: {
    type: result,
  },
  awayScore: {
    type: result,
  },
  _fixture: [
    {
      type: Schema.Types.ObjectId,
      ref: 'fixture',
      required: true,
    },
  ],
});

resultSchema.pre('save', async function (next) {
  try {
    await this.populate({ path: '_fixture' }).execPopulate();
  } catch (error) {
    console.log(error);
  }
});

const populateFixture = function (next) {
  this.populate({ path: '_fixture' });
  next();
};

resultSchema.pre('find', populateFixture).pre('findOne', populateFixture);

module.exports = mongoose.model('result', resultSchema);
