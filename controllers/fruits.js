const Fruit    = require('../models/fruits');
const Category = require('../models/categories');
const findOrCreateCategory = require('./categories')

async function saveFruit(name, price, categoryName) {
  let categories = await Category.find({ name: categoryName });
  let category   = categories[0];
  console.log('CATEGORY:', category)
  let existingFruit = await Fruit.find({ name: name });
  let fruit;
  if (existingFruit.length) {
    fruit            = existingFruit[0];
    fruit.price      = price;
    fruit.categoryId = category._id;
    await fruit.save();
  } else {
    fruit = new Fruit({
      name: name,
      price: price,
      categoryId: category._id
    })
    await fruit.save();
  }

}

module.exports = saveFruit;
