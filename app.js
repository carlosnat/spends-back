const express = require('express');
const thirdPartyModules = require('./middleware-third-party/third-party');
const database = require('./api/database');
const appRoutes = require('./api/routes');
const errorMiddleware = require('./middleware/error');

const app = express();
thirdPartyModules(app);

async function connectToDataBase() {
  await database.connect();
}
connectToDataBase();
appRoutes(app);

app.get('/api', async (req, res) => {
  res.json({
    msg: 'welcome to family-spend-api',
  });
});

app.get('/health', (req, res) => {
  const info = {
    'node-version': process.version,
    memory: process.memoryUsage(),
    pid: process.pid,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    appName: process.env.name,
    appVersion: process.env.npm_package_version,
    hostname: process.env.HOSTNAME,
  };
  res.send(info);
});

app.use(errorMiddleware);

module.exports = app;
