const jwt = require('jsonwebtoken');
const User = require('../models/model.user');
const { verifyToken } = require('./authentication');
const { ACCOUNT_ROLES } = require('../constants');

const authGuard = (
  roles = [
    ACCOUNT_ROLES.USER,
    ACCOUNT_ROLES.ADMIN,
    ACCOUNT_ROLES.WRITER,
    ACCOUNT_ROLES.EDITOR,
  ]
) =>
  async function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).end();
    }

    const token = authorization.split('Bearer ')[1].trim();

    let payload;

    try {
      payload = await verifyToken(token);
    } catch (error) {
      return res.status(401).end();
    }

    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec();

    if (!user) {
      return res.status(401).end();
    }

    if (!roles.includes(user.role)) {
      return res.status(401).end();
    }

    req.user = user;

    next();
  };

module.exports = {
  authGuard,
};
