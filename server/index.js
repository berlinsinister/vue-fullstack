const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const routes = require('./routes/index');

const app = express();

// middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const api = '/api/v1/tasks';
app.use(api, routes);

const PORT = 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(app.listen(PORT, () => console.log('vue-express fullstack')))
  .catch((error) => console.log(error));
