'use strict'
const Joi = require('joi');

const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    services: Joi.array().items(
        Joi.object({
            service: Joi.string().min(3).max(30).required(),
            path: Joi.string().min(3).max(30).required(),
            method: Joi.string().valid(['GET', 'POST', 'DELETE', 'PUT']).required()
        }).required()
    ).required()
});

function validateReqParams(req, res, next) {
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
        next();
    } else {
        res.status(403).json({
            error_msg: result.error.details[0].message
        });
    }
}

module.exports = validateReqParams;