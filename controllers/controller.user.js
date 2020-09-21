const mongoose = require('mongoose');
const User = require('../models/model.user');
const { ACCOUNT_ROLES } = require('../constants');
const { generateToken } = require('../utils/authentication');

const createOne = async (req, res) => {
  const { email, password, confirmedPassword } = req.body;

  if (!email || !password || !confirmedPassword) {
    res.status(400).json({ error: 'Please enter all required fields' });
  }

  if (password !== confirmedPassword) {
    res.status(400).json({ error: 'Supplied passwords do not match' });
  }

  try {
    const user = await User.create({
      email,
      password,
      role: ACCOUNT_ROLES.USER,
    });

    const token = await generateToken(user);

    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').lean().exec();
    res.status(200).json({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Must enter all fields' });
  }

  try {
    const user = await User.findOne({ email }).select('email password').exec();

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password supplied',
      });
    }

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword) {
      return res.status(401).json({
        error: 'Invalid email or password supplied',
      });
    }

    const token = await generateToken(user);

    return res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updatePassword = async (req, res) => {
  const id = req.user._id;

  const mongooseId = mongoose.Types.ObjectId(id);
  const userToUpdate = await User.findById({ _id: mongooseId });

  const { password, newPassword } = req.body;

  const isMatchingPassword = await userToUpdate.comparePassword(password);

  if (isMatchingPassword) {
    try {
      await User.findByIdAndUpdate(mongooseId, { password: newPassword })
        .lean()
        .exec();

      res.status(201).json({ msg: 'Password updated' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(401).json({ error: 'Please supply correct details' });
  }
};

const updateEmail = async (req, res) => {
  const id = req.user._id;
  const mongooseId = mongoose.Types.ObjectId(id);
  const { newEmail } = req.body;

  if (!newEmail) {
    return res.status(400).json({ error: 'Must enter new email' });
  }

  try {
    await User.findByIdAndUpdate(mongooseId, { email: newEmail }).lean().exec();

    res.status(201).json({ msg: 'Email updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  createOne,
  signIn,
  updateEmail,
  updatePassword,
  getAllUsers,
};
