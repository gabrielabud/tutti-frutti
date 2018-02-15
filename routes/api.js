var express = require('express');
var router = express.Router();
const Fruit = require('../models/fruits');

router.get('/', (req, res) => {
    Fruit.find({}, (err, fruitList) => {
        if (err) throw err;
        res.status(200).send(fruitList)
    })
})

module.exports = router;