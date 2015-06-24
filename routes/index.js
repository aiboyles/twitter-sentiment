var express = require('express');
var router = express.Router();
var twitterSearch = require('../logic/twitterSearch');

router.index = function(req, res) {
  res.render('index', {
    title: 'Twitter Sentiment Analysis'
  });
}

router.search = function(req, res) {
    twitterSearch(req.body.search, function (data) {
        res.json(data);
  });
};
    
module.exports = router;
