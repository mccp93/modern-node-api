const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 8;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.methods.comparePassword = function (passwordToCompare) {
  const hashedPassword = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordToCompare, hashedPassword, (error, isMatch) => {
      if (error) {
        reject(error);
      }

      resolve(isMatch);
    });
  });
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
      if (error) {
        reject(error);
      }

      resolve(hash);
    });
  });
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
    next();
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.password) {
      this._update.password = await hashPassword(this._update.password);
    }
    next();
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = mongoose.model('user', userSchema);
