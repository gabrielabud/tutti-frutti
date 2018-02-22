const Fruit    = require('../models/fruits');

async function saveOrUpdateFruit(name, price, categoryId) {
  name = cleanUpName(name);
  let existingFruit = await Fruit.find({ name: name });
  if (existingFruit.length) {
    await updateFruit(existingFruit[0], price, categoryId);
  } else {
    await saveNewFruit(name, price, categoryId);
  }
}

async function saveNewFruit(name, price, categoryId) {
  let fruit = new Fruit({
    name: name,
    price: price,
    categoryId: categoryId
  })
  await fruit.save();
}

async function updateFruit(fruitObject, newPrice, newCategoryId) {
  fruitObject.price      = newPrice;
  fruitObject.categoryId = newCategoryId;
  await fruitObject.save();
}

let cleanUpName = (fruitName) => {
  fruitName = fruitName.replace('  ', ' ');
  ['[', '(', '{'].forEach(char => fruitName = fruitName.replace(char, '- '));
  [']', ')', '}'].forEach(char => fruitName = fruitName.replace(char, ''));
  return fruitName;
}

module.exports = saveOrUpdateFruit;
