const express = require('express');
const app = express();
const GroupRoutes = require('./api/familyGroup/group.routes');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/family-spend');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Contro-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
})

app.get('/', async (req, res) => {    
    res.json({msg:'welcome to family-spend-api', saved})
})

app.use('/family', GroupRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 400;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    })
})


module.exports = app;