const rp = require('request-promise');
const cheerio = require('cheerio');
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

const scrape = (uri) => {
  let options = {
    uri: uri,
    transform: (body) => {
      return cheerio.load(body);
    }
  }
  rp(options)
    .then(($) => {
      var productNames  = $('.tailor-made-product-name').toArray();
      var productPrices = $('.tailor-made-product-price-box').toArray();
      productNames.forEach((item, i) => {
        let itemName  = item.children[0].data.trim();
        let itemPrice = productPrices[i].children[0].data.trim().replace(/£/, '');
        saveNewFruit(itemName, itemPrice);
      })
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = scrape;