const jwt = require('jsonwebtoken');
const User = require('../models/model.user');

const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.SECRET,
      {
        expiresIn: process.env.EXPIRY,
      },
      (error, token) => {
        if (error) {
          reject(error);
        }

        resolve(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (error, payload) => {
      if (error) {
        reject(error);
      }

      resolve(payload);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
