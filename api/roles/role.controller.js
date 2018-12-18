'use strict'
const asyncMiddleware = require('../../middleware/async');
const Role = require('./role.schema');

const getAll = (req, res)=> {
    res.json({msg: 'ok'});
}

const create = (req, res) => {
    console.log(req.body);
    res.json({msg: 'ok'});
}

exports.getAll = asyncMiddleware(getAll);
exports.create = asyncMiddleware(create);
