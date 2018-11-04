const mongoose = require('mongoose');
const Family = require('./family.model');
const Groups = require('../spendGroup/spendGroup.model');
const Operations = require('../operation/operation.model');

exports.getAllFamilies = async (req, res) => {
  try {
    console.log('req.params.userId', req.params.userId);
    const families = await Family.find({ createdBy: req.params.userId }).lean();
    res.json(families);
  } catch (error) {
    res.json({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.getById = async (req, res) => {
  try {
    const family = await Family.findById(req.params.familyId).lean();
    const operations = await Operations.find({ family: req.params.familyId }).lean();
    console.log('operations', operations);
    family.operations = operations;
    console.log('family', family);
    res.json(family);
  } catch (error) {
    res.json({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.createFamily = async (req, res) => {
  try {
    const product = new Family({
      name: req.body.name,
      createdBy: req.body.userId,
    });
    const familySaved = await product.save();
    res.json({ familySaved });
  } catch (error) {
    res.json({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.addMember = async (req, res) => {
  try {
    const groupFound = await Family.findOneAndUpdate(req.params.idFamily, {
      $push: {
        members: req.body,
      },
    }, { new: true });
    res.json(groupFound);
  } catch (error) {
    res.json({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.addGroupSpend = async (group) => {
  try {
    console.log('add group', group);
    const familyUpdated = await Family.findOneAndUpdate({ _id: group.belongsToFamily }, {
      $push: {
        spendsGroups: group,
      },
    }, { new: true });
    return familyUpdated;
  } catch (error) {
    res.json({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.addCategory = async (category) => {
  try {
    const familyUpdated = await Family.findOneAndUpdate({ _id: category.belongsToFamily }, {
      $push: {
        categories: category,
      },
    }, { new: true });
    return familyUpdated;
  } catch (error) {
    throw new Error({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.editCategory = async (category) => {
  try {
    const familyToUpdate = await Family.findById(category.belongsToFamily).lean();
    familyToUpdate.categories.forEach((element) => {
      if (element._id.toString() === category._id) {
        element.name = category.name;
        element.icono = category.icono;
      }
    });
    const familyUpdated = await Family.findByIdAndUpdate(familyToUpdate._id, familyToUpdate, { new: true });
    return familyUpdated;
  } catch (error) {
    throw new Error({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.removeCategory = async (category) => {
  try {
    const familyToUpdate = await Family.findById(category.belongsToFamily).lean();
    familyToUpdate.categories = familyToUpdate.categories.filter(element => element._id.toString() !== category._id.toString());
    const familyUpdated = await Family.findByIdAndUpdate(familyToUpdate._id, familyToUpdate, { new: true });
    return familyUpdated;
  } catch (error) {
    throw new Error({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.addSpend = async (req, res) => {
  try {
    req.body.createdAt = Date.now();
    const groupFound = await Family.findOneAndUpdate(req.params.idFamily, {
      $push: {
        spends: req.body,
      },
    }, { new: true });
    res.json(groupFound);
  } catch (error) {
    res.json({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};
