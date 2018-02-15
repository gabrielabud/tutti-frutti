var express = require('express');
var axios = require('axios');
var router = express.Router();
let Fruit = require('../models/fruits.js');
var mongoose = require('mongoose');
const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
    uri: 'http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/apples-pears-29/',
    transform: function (body) {
        return cheerio.load(body);
    }
}

router.get('/new', (req, res) => {
    let fruits = [];
    rp(options)
        .then(($) => {
            console.log('HERE!!!!')
            var productNames = $('.tailor-made-product-name').toArray();
            var productPrices = $('.tailor-made-product-price-box').toArray();
            for (let i = 0; i < productNames.length; i++) {
                let name = productNames[i].children[0].data.trim();
                let price = Number(productPrices[i].children[0].data.trim().replace(/£/,""));
                Fruit.find({name: name}, function(err, fruitList){
                    if (fruitList[0] === undefined) {
                        var fruit = new Fruit({
                            name: name,
                            price: price
                        })
                        fruit.save(function (err) {
                            if (err) throw err;
                        });  
                    }
                })        
            }
            res.send('Save successful');
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;