const { Router } = require('express');
const router = Router();
const { authGuard } = require('../utils/authorization');
const upload = require('../utils/file')('post');

const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} = require('../controllers/controller.post');

router
  .route('/')
  .get(getAll)
  .post(authGuard(), upload.single('image'), createOne);

router
  .route('/:id')
  .get(getOne)
  .delete(deleteOne)
  .put(authGuard(), upload.single('image'), updateOne);

module.exports = router;
