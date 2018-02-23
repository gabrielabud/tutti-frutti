var express           = require('express');
var router            = express.Router();
const Promise         = require('bluebird');
const scrapePage      = require('../controllers/scrapers');
const Fruit           = require('../models/fruits');
const Category        = require('../models/categories');
const CategoryMethods = require('../controllers/categories');
const productPages    = require('../data/pages');

router.get('/', (req, res) => {
  (async() => {
    let response = {};
    response.categories = await Category.find();
    response.fruits     = await Fruit.find();
    res.send(response);
  })();
})

router.post('/new', (req, res) => {
  Promise.map(productPages, async page => {
    await CategoryMethods.findOrCreateCategory(page);
    let categoryId = await CategoryMethods.getCategoryId(page.categoryKey);
    await scrapePage(page, categoryId);
  });
  res.status(200).send('Save successful');
});

router.post('/delete', (req, res) => {
  (async() => {
    await Category.remove({});
    await Fruit.remove({});
    res.send('Deleted All Records');
  })();
})

module.exports = router;