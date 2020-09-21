const Fixture = require('../models/model.fixture');

const getAll = async (req, res) => {
  try {
    const fixtures = await Fixture.find({}).lean().exec();
    res.status(200).json({ data: fixtures });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const fixture = await Fixture.findById(id).lean().exec();
    res.status(200).json({ data: fixture });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const createOne = async (req, res) => {
  const { homeTeam, awayTeam, venue, date } = req.body;

  try {
    const fixture = await Fixture.create({
      homeTeam,
      awayTeam,
      venue,
      date,
    });

    res.status(201).json({ data: fixture });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const fixture = await Fixture.findByIdAndDelete(id).lean().exec();
    res.status(200).json({ data: fixture });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;

  try {
    const fixture = await Fixture.findByIdAndUpdate(id, req.body, { new: true })
      .lean()
      .exec();
    res.status(200).json({ data: fixture });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

module.exports = {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
};
