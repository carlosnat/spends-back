const Category = require('./category.model');
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
        console.log('delete', req.params.id);
        const categoryToDelete = await Category.findById(req.params.id).lean();
        const familyUpdated = await familyController.removeCategory(categoryToDelete);
        const modelDeleted = await Category.remove({_id:req.params.id});
        res.json(familyUpdated);
    } catch (error) {
        res.json({error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
    }
}
