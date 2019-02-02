const http = require('http');
const startupApp = require('debug')('app:startup');
const app = require('./app');

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, () => {
  startupApp('Server is running on port: =>', port);
  startupApp('Server is ruuning in enviroment =>', app.get('env'));
});
