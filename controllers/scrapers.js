// To extract out Router logic
const rp            = require('request-promise');
const cheerio       = require('cheerio');
const saveNewFruit  = require('./fruits')

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