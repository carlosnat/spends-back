const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  name: { type: String },
  services: [{ 
      service: { type: String },
      path: { type: String },
      method: { type: String }  
    }],
});

module.exports = mongoose.model('Roles', roleSchema);