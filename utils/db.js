const mongoose = require('mongoose');

const connectToDatabase = (options) => {
  return mongoose.connect(process.env.DB_URL, { ...options });
};

module.exports = connectToDatabase;
