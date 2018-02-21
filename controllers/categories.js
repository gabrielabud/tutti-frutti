const Category = require('../models/categories');

async function findCategory(categoryName) {
  Category.find({ name: categoryName }, (err, results) => {
    if (err) throw err;
    return results;
  })
}

async function saveCategory(categoryName) {
  try {
    let categoryFound = await findCategory(categoryName);
    if (categoryFound.length) return categoryFound[0];
    let category = new Category({ name: categoryName });
    category.save(err => {
      if (err) throw err
    });
    return category;
  } catch(err) {
    console.log(err);
  }
}

module.exports = saveCategory;