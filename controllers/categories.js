const Promise   = require('bluebird');
const Category = require('../models/categories');

async function findOrCreateCategory(categoryName) {
  let categories = await Category.find({ name: categoryName })
  if (categories.length) {
    console.log('FOUND CATEGORY', categories);
  } else {
    let category = new Category({ name: categoryName });
    await category.save();
    console.log('SAVED NEW CATEGORY', category);
  }
}

async function getCategoryId(categoryName) {
  let categories = await Category.find({ name: categoryName });
  if (categories.length) {
    return categories[0]._id
  } else {
    throw(`Error: ${categoryName} not found`)
  }
}

module.exports = {
  findOrCreateCategory,
  getCategoryId
}
