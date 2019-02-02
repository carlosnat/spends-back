
const phoneBook = require('./phoneBook.schema');
const asyncMiddleware = require('../../middleware/async');

const getAll = async (req, res) => {
  const endpoints = await phoneBook.find();
  res.json(endpoints);
};

exports.getAll = asyncMiddleware(getAll);
