var express       = require('express');
var router        = express.Router();
const Promise   = require('bluebird');
const scrapePage  = require('../controllers/scrapers');
const Fruit       = require('../models/fruits');
const Category       = require('../models/categories');
const findOrCreateCategory = require('../controllers/categories');

router.post('/new', (req, res) => {
  let productPages = [
    {
      category : "Apples and Pears",
      uri      : "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/apples-pears-29/"
    },
    {
      category : "Bananas",
      uri      : "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/bananas-30/"
    },
    {
      category : "Citrus Fruits",
      uri      : "http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/citrus-fruits-40/"
    }
  ]

  Promise.map(productPages, async page => {
    await findOrCreateCategory(page.category);
    let categories = await Category.find({ name: page.category });
    let categoryId   = categories[0]._id;
    await scrapePage(page, categoryId);
  })

  res.status(200).send('Save successful')
})

router.get('/', (req, res) => {
  Fruit.find({}, (err, searchResults) => {
    if (err) throw err;
      res.status(200).send(searchResults)
    })
})

module.exports = router;