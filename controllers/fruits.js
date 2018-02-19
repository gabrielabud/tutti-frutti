const Fruit = require('../models/fruits');

const saveNewFruit = (name, price) => {
  Fruit.find({ name: name }, (err, searchResults) => {
    if (!searchResults.length) {
      var fruit = new Fruit({
        name  : name,
        price : price
      })
      fruit.save((err) => {
        if (err) throw err;
      });  
    }
  }) 
}

module.exports = saveNewFruit;