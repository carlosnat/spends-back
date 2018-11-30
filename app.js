const express = require('express');
const thirdPartyModules = require('./middleware-third-party/third-party');
const database = require('./api/database');
const appRoutes = require('./api/routes');
const errorMiddleware = require('./middleware/error');
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

app.use(errorMiddleware);

module.exports = app;
