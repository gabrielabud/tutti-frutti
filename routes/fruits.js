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
                var productNames  = $('.tailor-made-product-name').toArray();
                var productPrices = $('.tailor-made-product-price-box').toArray();
                productNames.forEach((item, i) => {
                    let itemName  = item.children[0].data.trim();
                    let itemPrice = productPrices[i].children[0].data.trim().replace(/£/, '');
                    Fruit.find({ name: itemName }, (err, searchResults) => {
                        if (!searchResults.length) {
                            var fruit = new Fruit({
                                name: itemName,
                                price: itemPrice
                            })
                            fruit.save((err) => {
                                if (err) throw err;
                            });  
                        }
                    })        
                })
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
    Fruit.find({}, (err, searchResults) => {
        if (err) throw err;
        res.status(200).send(searchResults)
    })
})

module.exports = router;