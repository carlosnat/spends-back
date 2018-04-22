const mongoose = require('mongoose');
const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const checkEmail = await User.find({email: req.body.email}).lean();
    if (checkEmail.length > 0){
        res.status(500).json({error_code:10, error_msg:'Email user already existed'});
    }
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        req.body.createdAt = Date.now();
        req.body.password = hash;
        const userCreated = await User.create(req.body)
        res.json({userCreated})
    } catch (error) {
        res.status(500).send({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    }
}
