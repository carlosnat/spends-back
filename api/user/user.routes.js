const userModel = require('./user.model');
const routes = require('../routes');
const userController = require('./user.controller');

const Joi = require('joi');
const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
  avatar: Joi.string().alphanum().min(3).max(30).required(),
  password: [Joi.string(), Joi.number()],
  birthdate: Joi.date(),
  email: Joi.string().email({
    minDomainAtoms: 2
  })
});

function validateReqParams(req, res, next) {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    next();
  } else {
    console.log(result.error.details[0].message)
    res.status(403).json({
      error_msg: result.error.details[0].message
    });
  }
}

module.exports = function (app) {
  app.post('/api/user/signup', validateReqParams, userController.signup);
  app.post('/api/user/login', userController.login);
  routes(app, userModel, 'user');
};