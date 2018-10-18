'use strict'

const spendController = require('./spendGroup.controller');
const spendGroupModel = require('./spendGroup.model');
const routes = require('../routes');

module.exports = function(app){
    app.get('/api/spendgroup/:familyId', spendController.getAllGroups);
    app.post('/api/spendgroup', spendController.createGroup);
    app.put('/api/spendgroup', spendController.editGroup);
    app.delete('/api/spendgroup/:id', spendController.deleteGroup);
    routes(app, spendGroupModel, 'spendgroup');
}
