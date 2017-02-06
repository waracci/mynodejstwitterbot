//require all dependencies

var twit = require('twit');

var config = require('./config.js');

var Twitter = new twit(config);

//function that finds the latest tweets 
var retweet = function() {
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }


Twitter.get('search/tweets', params, function(err, data){
  //if there are no errors
  if(!err){
    //grab id of tweet to retweet
    var retweetId = data.statuses[0].id_str;
    //tell TWITTER to retweet
    Twitter.post('statuses/retweet/:id', {
      id: retweetId
    }, function(err, response) {
      if (response) {
        console.log('retweeted mate');
      }

      //if there was an error during retweeting
      if (err){
        console.log('something went wrong mate, maybe duplication mate.');
      } 
    });
  }
  //if unable to search a tweet
  else {
    console.log('something went wrong while searching mate');
     }
  });
}

//grab and retweet as soon as program starts running

retweet();
setInterval(retweet, 3000000);// 50 minutes

//find a random tweet and favorite it

var favoriteTweet = function(){
  var params = {
    q: '#Nodejs, #nodejs',//required
    result_type: 'recent',
    lang: 'en'
  }
  //find the tweet
  Twitter.get('search/tweets', params, function(err, data){
    //find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet); //pick a rando tweet

    //if random tweet exists
    if (typeof randomTweet != 'undefined'){
      // tell twitter to favorite
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error during favoriting
        if (err){
          console.log('cannot favorite, grave error');
        } else {
          console.log('favorited success mate');
        }
      });
    }
  });
}

favoriteTweet();
setInterval(favoriteTweet, 3600000);
// funvtion to generate random tweet
function ranDom (arr){
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
