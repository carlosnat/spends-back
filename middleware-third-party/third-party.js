
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const thirdPartyModuleDebugger = require('debug')('app:third-party');

function loadThirdPartyModules(app) {
  app.use(morgan('tiny'));
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  thirdPartyModuleDebugger('third party modules load success finish');
}

module.exports = loadThirdPartyModules;
