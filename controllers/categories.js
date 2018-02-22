const Category = require('../models/categories');

async function findOrCreateCategory(categoryName) {
  let categoryFound = await Category.find({ name: categoryName })
  if (categoryFound.length) {
    console.log('FOUND CATEGORY', categoryFound);
    return categoryFound[0];
  } else {
    let category = new Category({ name: categoryName });
    await category.save();
    console.log('SAVED NEW CATEGORY', category);
    return category;
  }
}

module.exports = findOrCreateCategory;