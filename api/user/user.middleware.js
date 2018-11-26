'use strict'
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

module.exports = validateReqParams;