const Fruit    = require('../models/fruits');
const Category = require('../models/categories');
const saveCategory = require('./categories')

async function saveFruit(categoryName, name, price) {
  try {
    let categoryId = await saveCategory(categoryName)._id;
    Fruit.find({ name: name }, (err, searchResults) => {
      if (searchResults.length) {
        let fruit = searchResults[0];
        fruit.price      = price;
        fruit.categoryId = categoryId;
        fruit.save((err) => {
          if (err) throw err;
        })
      } else {
        var fruit = new Fruit({
          name      : name,
          price     : price,
          categoryId: categoryId
        })
        fruit.save((err) => {
          if (err) throw err;
        });  
      }
    })
  } catch(err) {
    console.log(err)
  }

  
  
}

module.exports = saveFruit;