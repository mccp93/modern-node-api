const { Router } = require('express');
const router = Router();
const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} = require('../controllers/controller.fixture');

router.route('/').get(getAll).post(createOne);

router.route('/:id').get(getOne).delete(deleteOne).put(updateOne);

module.exports = router;
