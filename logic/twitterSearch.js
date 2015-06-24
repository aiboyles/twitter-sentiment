//includes
var util = require('util'),
    twitter = require('twit');
    //db = require('diskdb');
    var sentiment = require('sentiment');
    var config = require('../config');
 
//db = db.connect('db', ['sentiments']);

//config
var configValues = {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
};

 
module.exports = function(text, callback) {
  console.log("I am in twitterSearch");
  console.log("text is :" + text);
  var twitterClient = new twitter(configValues);
  console.log("still in TwitterSearch");
  var today = new Date();
    var reqstring = '' + text + ' since:' + today.getFullYear() + '-' +
      (today.getMonth() + 1) + '-' + today.getDate();
  console.log("req string is: " + reqstring);
  var today = new Date();
  var response = []; // to store the tweets and sentiment
    
  // grad 20 tweets from today
    twitterClient.get('search/tweets', {q: reqstring, count:20}, function(err, data) {
        console.log("I am in the 20 tweets grabbing thing");
        var aggregateScore = 0;
        //score = performAnalysis(data['statuses']);
        var tweetSet = data['statuses'];
        for (var i = 0; i < tweetSet.length; i++) {
            var resp = {};
 
            resp.tweet = (tweetSet[i])['text'].replace('#', '');
            
            resp.sentiment = sentiment(resp.tweet)['score'];
            resp.words = sentiment(resp.tweet)['words'];
            aggregateScore += resp.sentiment;
            response.push(resp);
            //console.log("matched words :" + sentiment(resp.tweet)['words']);
            //console.log("screen name :" + tweetSet[i].user.screen_name);
            //console.log("resp.tweet :" + resp.tweet);
        //    console.log("resp.sentiment :" + resp.sentiment);
          //  console.log("aggregateScore: " + aggregateScore);
            };
        aggregateScore = aggregateScore / tweetSet.length;
        console.log("final aggregateScore: " + aggregateScore);
        var finalscore = {
                            tweet: "AggregateScore",
                            sentiment: aggregateScore
                            }
        response.push(finalscore);
        console.log("now calling back to index.js");
        callback(response);
    });
}