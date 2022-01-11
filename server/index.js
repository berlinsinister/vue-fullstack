const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const auth = require('./middleware/auth');

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', auth, taskRoutes);
// app.use('/api/v1/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(app.listen(PORT, () => console.log('vue-express fullstack')))
  .catch((error) => console.log(error));
