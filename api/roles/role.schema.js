const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  name: { type: String },
  services: [{ 
      url: { type: String },
      method: { type: String }  
    }],
});

module.exports = mongoose.model('Roles', roleSchema);