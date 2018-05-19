'use strict'

var familyModel = require('./family.model');
var routes = require('../routes');
const familyController = require('./family.controller');

module.exports = function(app){
    app.post('/api/family', familyController.createFamily);
    app.post('/api/family/spendgroup/:idFamily', familyController.addGroupSpend);
    app.get('/api/family/:userId', familyController.getAllFamilies);
    routes(app, familyModel, 'family');
}
