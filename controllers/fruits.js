const Fruit    = require('../models/fruits');
const Category = require('../models/categories');

const saveFruit = (categoryName, name, price) => {
  let categoryId;
  Category.find({ name: categoryName }, (err, results) => {
    if (err) throw err;
    if (results.length) {
      console.log('FOUND CATEGORY')
      categoryId = results[0]._id
    } else {
      console.log('SAVED NEW CATEGORY')
      let newCategory = new Category({
        name: categoryName
      })
      newCategory.save((err) => {
        if (err) throw err;
      })
      categoryId = newCategory._id;
    }
    console.log("CATEGORY ID =>>>", categoryId)
  })


  Fruit.find({ name: name }, (err, searchResults) => {
    if (searchResults.length) {
      console.log('FRUIT FOUND')
      let fruit = searchResults[0];
      fruit.price      = price;
      fruit.categoryId = categoryId;
      fruit.save((err) => {
        if (err) throw err;
      })
    } else {
      console.log('FRUIT NOT FOUND!')
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
  
  
}

module.exports = saveFruit;