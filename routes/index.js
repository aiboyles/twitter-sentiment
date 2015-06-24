var express = require('express');
var router = express.Router();
var twitterSearch = require('../logic/twitterSearch');

/* GET home page. */
/*router.get('/', function(req, res, next) {
    console.log("I am in index.js");
  res.render('index', { title: 'Express' });
});*/

router.index = function(req, res) {
    console.log("I am in index.js");
  res.render('index', {
    title: 'HomeHOMEHOME'
  });
}

/*router.get('/about', function(req, res, next) {
    console.log("I am in about.js");
  res.render('index', { title: 'ABOUT' });
});*/

router.about = function(req, res) {
    console.log("I am in about.js");
    res.render('index', {
    title: 'ABOUTAboutUs'
  });
};

router.search = function(req, res) {
    console.log("I am in search");
    console.log("req is: " + req.body.search);
    console.log("header type is: " + req.headers['content-type']);
    twitterSearch(req.body.search, function (data) {
        console.log("I have now return from twitterSearch and will go back to main.js");
        console.log("first data element is: " + data[0].tweet);
        res.json(data);
  });
};
    

module.exports = router;
