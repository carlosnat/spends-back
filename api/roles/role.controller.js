'use strict'
const asyncMiddleware = require('../../middleware/async');
const Role = require('./role.schema');

const getAll = async (req, res)=> {
    
    res.json({msg:'ok'});
}

const create = async (req, res) => {
    const roleCreated = new Role(req.body);
    const roleSaved = await roleCreated.save(); 
    res.json({role: roleSaved});
}

exports.getAll = asyncMiddleware(getAll);
exports.create = asyncMiddleware(create);
