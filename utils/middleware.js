const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { json, urlencoded } = require('body-parser');
require('dotenv').config();

const setupMiddleware = (app) => {
  app.use(cors());
  app.use(json());
  app.use(morgan('tiny'));
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
};

module.exports = setupMiddleware;
