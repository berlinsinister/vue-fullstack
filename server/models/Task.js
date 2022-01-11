const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    url: {
      type: String,
      default: 'https://',
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
    notes: {
      type: String,
      default: 'no notes',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      // type: String,
      required: true,
      // default: 'set user later',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
