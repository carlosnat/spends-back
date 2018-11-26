const express = require('express');
const thirdPartyModules = require('./middleware-third-party/third-party');
const database = require('./api/database');
const appRoutes = require('./api/routes');

const app = express();
thirdPartyModules(app);
(async() => await database.connect())();
appRoutes(app);

app.get('/api/health', async (req, res) => {
  res.json({ msg: 'welcome to family-spend-api' });
});

/* require('./api/family/family.routes')(app);
require('./api/category/category.routes')(app);
require('./api/operation/operation.routes')(app);
require('./api/spendGroup/spendGroup.routes')(app); */

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
