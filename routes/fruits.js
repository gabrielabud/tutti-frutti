var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const rp = require('request-promise');
const cheerio = require('cheerio');

const Fruit = require('../models/fruits.js');
const scrape = require('../controllers/fruits');


router.post('/new', (req, res) => {
    let urisToScrape = [
        "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/apples-pears-29/",
        "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/bananas-30/",
        "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/citrus-fruits-40/"
    ]
    urisToScrape.forEach((uri) => scrape(uri));
    res.status(200).send('Save successful')
})

router.get('/', (req, res) => {
    Fruit.find({}, (err, searchResults) => {
        if (err) throw err;
        res.status(200).send(searchResults)
    })
})

module.exports = router;