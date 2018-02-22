// To extract out Router logic
const rp        = require('request-promise');
const cheerio   = require('cheerio');
const saveFruit = require('./fruits')

async function scrapePage(pageCategory, pageUri) {
  let options = {
    uri: pageUri,
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
        console.log('SAVING...')
        saveFruit(pageCategory, itemName, itemPrice);
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = scrapePage;