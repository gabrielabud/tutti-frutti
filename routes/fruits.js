var express = require('express');
var router = express.Router();
let Fruit = require('../models/fruits.js');
var mongoose = require('mongoose');
const rp = require('request-promise');
const cheerio = require('cheerio');

router.post('/new', (req, res) => {
    let fruits = [];
    urisToScrape = [
        "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/apples-pears-29/",
        "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/bananas-30/",
        "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/citrus-fruits-40/"
    ]
    urisToScrape.forEach((uri, index) => {
        let options = {
            uri: uri,
            transform: (body) => {
                return cheerio.load(body);
            }
        }
        rp(options)
            .then(($) => {
                var productNames = $('.tailor-made-product-name').toArray();
                var productPrices = $('.tailor-made-product-price-box').toArray();
                for (let i = 0; i < productNames.length; i++) {
                    let name = productNames[i].children[0].data.trim();
                    let price = Number(productPrices[i].children[0].data.trim().replace(/£/,""));
                    Fruit.find({ name: name }, (err, fruitList) => {
                        if (fruitList[0] === undefined) {
                            var fruit = new Fruit({
                                name: name,
                                price: price
                            })
                            fruit.save((err) => {
                                if (err) throw err;
                            });  
                        }
                    })        
                }
                if (index === urisToScrape.length - 1) {
                    res.status(200).send('Save successful');
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
})

router.get('/', (req, res) => {
    Fruit.find({}, (err, fruitList) => {
        if (err) throw err;
        res.status(200).send(fruitList)
    })
})

module.exports = router;