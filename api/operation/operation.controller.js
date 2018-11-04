const moment = require('moment');
const Operation = require('./operation.model');

exports.create = async (req, res) => {
  try {
    const data = req.body;
    data.occurrenceDate = moment(data.occurrenceDate, 'YYYY-MM-DD');
    data.createdAt = Date.now();
    const newOperation = new Operation(data);
    const operationSaved = await newOperation.save();
    res.json(operationSaved);
  } catch (error) {
    res.json({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.getAll = async (req, res) => {
  try {
    const operations = await Operation.find({ family: req.params.idFamily })
      .populate('family', 'name')
      .populate('group', ['name', 'color'])
      .populate('category', ['name', 'icono']);
    res.json(operations);
  } catch (error) {
    res.json({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};
