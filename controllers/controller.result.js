const Result = require('../models/model.result');

const getAll = async (req, res) => {
  try {
    const results = await Result.find({}).lean().exec();
    res.status(200).json({ data: results });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'database error' });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Result.findById(id).lean().exec();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const createOne = async (req, res) => {
  const { homeScore, awayScore, _fixture } = req.body;

  try {
    const result = await Result.create({
      homeScore,
      awayScore,
      _fixture,
    });

    res.status(201).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'database error' });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Result.findByIdAndDelete(id).lean().exec();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Result.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    })
      .lean()
      .exec();
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
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
