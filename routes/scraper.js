var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

var scraper = express();

router.get('/' , function(req,res, next){
    res.render('scrape', { title: 'Express' });

    url = 'http://www.fruitfortheoffice.co.uk/tailormade-24/fruit-bowl-44/bananas-30/';

    request(url, function(error, response, html){

        if(erorr){
            var $ = cheerio.load(html)

            var name = tailor-made-product-name
            var json = { name: "" };

            $('.tailor-made-product-name').filter( function(){

                var data = $(this);
                
            })
        }

    })

})

// router.listen('3000')
console.log('lets get scraping');

exports = module.exports = router;
