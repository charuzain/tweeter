/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  /* $ajax({
    url:'/tweets',
    method:'GET',
    success:(data)=>{},
    error:(error)=>{}
  })*/



  /* const createTweetElement = function(tweet){
    let article = 
    `<article class="new-tweet">
            <header class="new-tweet-avatar">
              <img src="${tweet.user.avatars}" />
              <span class="profile-name">${tweet.user.name}</span>
              <span class="sirlsaac">${tweet.user.handle}</span>
            </header>
            <div class="text-div">${tweet.content.text}</div>
            <footer>
              <span>${timeago.format(tweet.created_at)}</span>
              <div class="icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i></div>
            </footer>
           </article>`;
  
          return article;
  }
  }) */


  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and ap pends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  }

  const createTweetElement = function (tweet) {
    let article =
      `<article class="new-tweet">
          <header class="new-tweet-avatar">
            <img src="${tweet.user.avatars}" />
            <span class="profile-name">${tweet.user.name}</span>
            <span class="sirlsaac">${tweet.user.handle}</span>
          </header>
          <div class="text-div">${tweet.content.text}</div>
          <footer>
            <span>${timeago.format(tweet.created_at)}</span>
            <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i></div>
          </footer>
         </article>`;

    return article;
  }



  renderTweets(data);

})