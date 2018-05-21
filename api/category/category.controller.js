const Category = require('./category.model');
const mongoose = require('mongoose');
const familyController = require('../family/family.controller');
const Family = require('../family/family.model');

exports.createCategory = async (req, res) => {
   try {
        const newCategory = new Category(req.body);
        newCategory.createdAt = Date.now();
        const categorySaved = await newCategory.save();
        const familyUpdated = await familyController.addCategory(categorySaved);
        res.json(familyUpdated);
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) }); 
    } 
}

exports.editCategory = async (req, res) => {
    try {
        const categoryUpdated = await Category.findByIdAndUpdate(req.body._id, req.body);
        const familyUpdated = await familyController.editCategory(req.body);
        res.json(familyUpdated)
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });         
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const categoryToDelete = await Category.findById(req.query._id).lean();
        const familyUpdated = await familyController.removeCategory(categoryToDelete);
        const modelDeleted = await Category.remove({_id:req.query._id});
        res.json(familyUpdated);
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
    }
}
