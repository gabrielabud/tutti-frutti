// To extract out Router logic
const rp        = require('request-promise');
const Promise   = require('bluebird');
const cheerio   = require('cheerio');
const saveFruit = require('./fruits');
const findOrCreateCategory = require('./categories');

const scrapePage = (page) => {
  let options = {
    uri: page.uri,
    transform: (body) => {
      return cheerio.load(body);
    }
  }
  rp(options)
    .then(($) => {
      var productNames  = $('.tailor-made-product-name').toArray();
      var productPrices = $('.tailor-made-product-price-box').toArray();
      return Promise.map(productNames, async (item, i) => {
        let itemName  = item.children[0].data.trim();
        let itemPrice = productPrices[i].children[0].data.trim().replace(/£/, '');
        await saveFruit(itemName, itemPrice, page.category)
      })

      // productNames.forEach((item, i) => {
      //   let itemName  = item.children[0].data.trim();
      //   let itemPrice = productPrices[i].children[0].data.trim().replace(/£/, '');
      //   console.log('SAVING...');
      //   (async () => {
      //     await saveFruit(pageCategory, itemName, itemPrice);
      //   })();
      // });
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = scrapePage;