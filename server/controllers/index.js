const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Task = mongoose.model(
  'Tasks',
  Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    url: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'not started',
    },
  })
);

// create
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ msg: task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// read
const readAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    tasks.reverse();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const readSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id });
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
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
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
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id });
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
