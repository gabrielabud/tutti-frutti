const Fruit    = require('../models/fruits');
const Category = require('../models/categories');
const findOrCreateCategory = require('./categories')

async function saveFruit(categoryName, name, price) {
  let category      = await findOrCreateCategory(categoryName);
  let existingFruit = await Fruit.find({ name: name });
  let fruit;
  if (existingFruit.length) {
    fruit = existingFruit[0];
    fruit.price    = price;
    fruit.categoryId = category._id;
  } else {
    fruit = new Fruit({
      name: name,
      price: price,
      categoryId: category._id
    })
    await fruit.save();
  }


    // try {
    //   let category = await saveCategory(categoryName);
    //   let categoryId = category._id;
    //   await Fruit.find({ name: name }, (err, searchResults) => {
    //     if (searchResults.length) {
    //       let fruit = searchResults[0];
    //       fruit.price      = price;
    //       fruit.categoryId = categoryId;
    //       fruit.save(err => {
    //         if (err) throw err;
    //       })
    //       resolve()
    //     } else {
    //       var fruit = new Fruit({
    //         name      : name,
    //         price     : price,
    //         categoryId: categoryId
    //       })
    //       fruit.save(err => {
    //         if (err) throw err;
    //       });  
    //     }
    //   })
    // } catch(err) {
    //   console.log(err)
    // }

}

module.exports = saveFruit;
