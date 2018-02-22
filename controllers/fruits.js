const Fruit    = require('../models/fruits');
const Category = require('../models/categories');
const saveCategory = require('./categories')

async function saveFruit(categoryName, name, price) {
  return new Promise(resolve => {
    try {
      let category = await saveCategory(categoryName);
      let categoryId = category._id;
      await Fruit.find({ name: name }, (err, searchResults) => {
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

  })




  
  
}

module.exports = saveFruit;