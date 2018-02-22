const Fruit    = require('../models/fruits');
const Category = require('../models/categories');
const findOrCreateCategory = require('./categories')

async function saveFruit(name, price, categoryId) {
  console.log('CATEGORY ID', categoryId)
  let existingFruit = await Fruit.find({ name: name });
  let fruit;
  if (existingFruit.length) {
    fruit            = existingFruit[0];
    fruit.price      = price;
    fruit.categoryId = categoryId;
    await fruit.save();
  } else {
    fruit = new Fruit({
      name: name,
      price: price,
      categoryId: categoryId
    })
    await fruit.save();
  }

}

module.exports = saveFruit;
