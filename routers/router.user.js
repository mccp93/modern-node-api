const { Router } = require('express');
const router = Router();
const {
  createOne,
  signIn,
  updatePassword,
  updateEmail,
  getAllUsers,
} = require('../controllers/controller.user');
const { authGuard } = require('../utils/authorization');
const { ACCOUNT_ROLES } = require('../constants');

router.route('/').get(authGuard([ACCOUNT_ROLES.ADMIN]), getAllUsers);

router.route('/').post(createOne);
router.route('/signin').post(signIn);

router.route('/password').put(authGuard(), updatePassword);
router.route('/email').put(authGuard(), updateEmail);

module.exports = router;
