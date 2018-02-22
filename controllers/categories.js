const Category = require('../models/categories');

async function findCategory(categoryName) {
  let categories = await Category.find({ name: categoryName }, (err, results) => {
    if (err) throw err;
    return results;
  })
  return categories;
}

async function saveCategory(categoryName) {
  let categoryFound = await findCategory(categoryName);
  console.log(1, categoryFound)
  if (categoryFound.length) return categoryFound[0];
  let category = new Category({ name: categoryName });
  await category.save();
  console.log(2, category)
  return category;


  // try {
  //   let categoryFound = findCategory(categoryName);
  //   console.log(categoryFound)
  //   if (categoryFound.length) return categoryFound[0];
  //   let category = new Category({ name: categoryName });
  //   category.save(err => {
  //     if (err) throw err
  //   });
  //   return category;
  // } catch(err) {
  //   console.log(err);
  // }
}

module.exports = saveCategory;