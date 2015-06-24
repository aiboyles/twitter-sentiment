//includes
var util = require('util'),
    twitter = require('twit');
    var sentiment = require('sentiment');
    var config = require('../config');

//config
var configValues = {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
};

 
module.exports = function(text, callback) {
    var twitterClient = new twitter(configValues);
    var today = new Date();
    var reqstring = '' + text + ' since:' + today.getFullYear() + '-' +
      (today.getMonth() + 1) + '-' + today.getDate();
    var response = []; // to store the tweets and sentiment
    
    // grab 30 tweets from today
    twitterClient.get('search/tweets', {q: reqstring, count:30}, function(err, data) {
        var aggregateScore = 0;
        var tweetSet = data['statuses'];
        
        // loop through returned tweets and store tweet text, tweet sentiment score,
        // and which matched words occurred in each tweet
        for (var i = 0; i < tweetSet.length; i++) {
            var resp = {};
            resp.tweet = (tweetSet[i])['text'].replace('#', '');
            resp.sentiment = sentiment(resp.tweet)['score'];
            resp.words = sentiment(resp.tweet)['words'];
            aggregateScore += resp.sentiment;
            response.push(resp);
        };
        aggregateScore = aggregateScore / tweetSet.length;
        
        var finalscore = {
                            tweet: "AggregateScore",
                            sentiment: aggregateScore
                            }
        
        response.push(finalscore);
        callback(response);
    });
}