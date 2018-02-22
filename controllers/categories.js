const Category = require('../models/categories');

async function findOrCreateCategory(categoryName) {
  let categoryFound = await Category.find({ name: categoryName })
  console.log('FOUND CATEGORY', categoryFound)
  if (categoryFound.length) return categoryFound[0];
  let category = new Category({ name: categoryName });
  await category.save();
  console.log('SAVED NEW CATEGORY', category)
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

module.exports = findOrCreateCategory;