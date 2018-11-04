const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get('/', async (req, res) => {
  res.json({ msg: 'welcome to family-spend-api' });
});

require('./api/family/family.routes')(app);
require('./api/category/category.routes')(app);
require('./api/operation/operation.routes')(app);
require('./api/spendGroup/spendGroup.routes')(app);
require('./api/user/user.routes')(app);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
