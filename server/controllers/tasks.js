const Task = require('../models/Task');

// create
const createTask = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(201).json({ msg: task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// read
const readAllTasks = async (req, res) => {
  try {
    // const tasks = await Task.find({});
    const tasks = await Task.find({ createdBy: req.user.userId });
    tasks.reverse();
    res.status(200).send({ nbHits: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const readSingleTask = async (req, res) => {
  // const { id } = req.params;
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  try {
    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
      return res.status(404).json({ msg: 'no such ID' });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update
const updateTask = async (req, res) => {
  // const { id } = req.params;
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return res.status(404).json({ msg: 'no such ID' });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete
const deleteTask = async (req, res) => {
  // const { id } = req.params;
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  try {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      createdBy: userId,
    });
    if (!task) {
      return res.status(404).json({ msg: 'no such ID' });
    }
    res.status(200).json({ msg: task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createTask,
  readAllTasks,
  readSingleTask,
  updateTask,
  deleteTask,
};
