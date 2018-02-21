var express  = require('express');
var router   = express.Router();
const scrape = require('../controllers/scrapers');
const Fruit  = require('../models/fruits');

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