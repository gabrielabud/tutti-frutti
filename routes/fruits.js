var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: 'http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/apples-pears-29/',
  transform: function(body) {
    return cheerio.load(body);
  }
}

router.get('/', (req, res) => {
    let fruits = [];
    rp(options)
        .then(($) => {
            console.log('HERE!!!!')
            var productNames = $('.tailor-made-product-name').toArray();
            var productPrices = $('.tailor-made-product-price-box').toArray();
            for(let i = 0; i < productNames.length; i++) {
                let name = productNames[i].children[0].data.trim();
                let price = productPrices[i].children[0].data.trim()
                fruits.push({
                    name: name,
                    price: price
                })
            }
            res.send({ "products": JSON.parse(JSON.stringify(fruits)) })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;