const Post = require('../models/model.post');

const getAll = async (req, res) => {
  try {
    const posts = await Post.find({}).lean().exec();
    res.status(200).json({ data: posts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'database error' });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).lean().exec();
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const createOne = async (req, res) => {
  const { title, body } = req.body;
  const { path } = req.file;
  const { _id } = req.user;

  try {
    const post = await Post.create({
      title,
      body,
      image: path,
      authorId: _id,
    });

    res.status(201).json({ data: post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'database error' });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id).lean().exec();
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(400).json({ error: 'database error' });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;

  let body;

  if (req.file) {
    body = { ...req.body, image: req.file.path, authorId: req.user._id };
  } else {
    body = { ...req.body, authorId: req.user._id };
  }

  try {
    const post = await Post.findByIdAndUpdate(id, body, {
      new: true,
      useFindAndModify: false,
    })
      .lean()
      .exec();
    res.status(200).json({ data: post });
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
