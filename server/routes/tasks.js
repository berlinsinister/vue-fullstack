const express = require('express');
const router = express.Router();
const {
  createTask,
  readAllTasks,
  readSingleTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

router.route('/').get(readAllTasks).post(createTask);
router.route('/:id').get(readSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
