const Category = require('./category.model');
const familyController = require('../family/family.controller');

exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    newCategory.createdAt = Date.now();
    const categorySaved = await newCategory.save();
    const familyUpdated = await familyController.addCategory(categorySaved);
    res.json(familyUpdated);
  } catch (error) {
    res.json({
      error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
    });
  }
};

exports.editCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.body._id, req.body);
    const familyUpdated = await familyController.editCategory(req.body);
    res.json(familyUpdated);
  } catch (error) {
    res.json({
      error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryToDelete = await Category.findById(req.params.id).lean();
    const familyUpdated = await familyController.removeCategory(categoryToDelete);
    await Category.remove({
      _id: req.params.id,
    });
    res.json(familyUpdated);
  } catch (error) {
    res.json({
      error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
    });
  }
};
