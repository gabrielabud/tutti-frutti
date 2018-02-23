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
    await CategoryMethods.findOrCreateCategory(page);
    let categoryId = await CategoryMethods.getCategoryId(page.categoryKey);
    await scrapePage(page, categoryId);
  });
  res.status(200).send('Save successful');
});

router.get('/', (req, res) => {
  (async() => {
    let response = {};
    response.categories = await Category.find();
    response.fruits     = await Fruit.find();
    res.send(response);

    // try {
    //   await Promise.map(productPages, async page => {
    //     let categoryId          = await CategoryMethods.getCategoryId(page.categoryKey);
    //     let fruitsInCategory    = await Fruit.find({ categoryId: categoryId });
    //     response[page.categoryKey] = {
    //       name  : page.categoryName,
    //       fruits: fruitsInCategory
    //     }
    //   })
    //   res.send(response);
    // } catch(e) {
    //   throw e;
    // }


  })();
})

module.exports = router;