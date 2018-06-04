'use strict'

var familyModel = require('./family.model');
var routes = require('../routes');
const familyController = require('./family.controller');

module.exports = function(app){
    app.post('/api/family', familyController.createFamily);
    app.post('/api/family/spendgroup/:idFamily', familyController.addGroupSpend);
    app.get('/api/family/user/:userId', familyController.getAllFamilies);
    app.get('/api/family/:familyId', familyController.getById);
    routes(app, familyModel, 'family');
}
