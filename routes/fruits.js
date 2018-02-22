var express           = require('express');
var router            = express.Router();
const Promise         = require('bluebird');
const scrapePage      = require('../controllers/scrapers');
const Fruit           = require('../models/fruits');
const Category        = require('../models/categories');
const CategoryMethods = require('../controllers/categories');
const productPages    = require('../data/pages');

router.post('/new', (req, res) => {
  Promise.map(productPages, async page => {
    await CategoryMethods.findOrCreateCategory(page.category);
    let categoryId = await CategoryMethods.getCategoryId(page.category);
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