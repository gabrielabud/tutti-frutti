const Category = require('../models/categories');

async function findOrCreateCategory(page) {
  let categories = await Category.find({ key: page.categoryKey })
  if (categories.length) {
    console.log('FOUND CATEGORY', categories);
  } else {
    let category = new Category({ 
      key : page.categoryKey,
      name: page.categoryName
    });
    await category.save();
    console.log('SAVED NEW CATEGORY', category);
  }
}

async function getCategoryId(categoryKey) {
  let categories = await Category.find({ key: categoryKey });
  if (categories.length) {
    return categories[0]._id
  } else {
    throw(`Error: ${categoryKey} not found`)
  }
}

module.exports = {
  findOrCreateCategory,
  getCategoryId
}
