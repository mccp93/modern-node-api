const Player = require('../models/model.player');

const getAll = async (req, res) => {
  try {
    const players = await Player.find({}).lean().exec();
    res.status(200).json({ data: players });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findById(id).lean().exec();
    res.status(200).json({ data: player });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const createOne = async (req, res) => {
  const { name, age, club, position } = req.body;

  try {
    const player = await Player.create({
      name,
      age,
      club,
      position,
    });

    res.status(201).json({ data: player });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findByIdAndDelete(id).lean().exec();
    res.status(200).json({ data: player });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findByIdAndUpdate(id, req.body, { new: true })
      .lean()
      .exec();
    res.status(200).json({ data: player });
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
