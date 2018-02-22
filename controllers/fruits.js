const Fruit    = require('../models/fruits');

async function saveFruit(name, price, categoryId) {
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
