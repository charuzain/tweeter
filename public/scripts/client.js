// const { tweets } = require("../../server/lib/in-memory-db") 

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const loadTweets = function(){
    $.ajax({
      url:'/tweets',
      method:'GET',
      dataType:'json',
      success:(tweets)=>{
        console.log(tweets);
       renderTweets(tweets);
      },
      error:(err)=>{
        console.err(err);
      }
    })

  }
    loadTweets();

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

  const renderTweets = function (tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and ap pends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  }

  renderTweets(tweets);

  $("#new-tweet-form").on('submit', function(event){
    event.preventDefault(); 
    //console.log($(this));
    const serializeData =$(this).serialize();
    //console.log(serializeData);
    $.post("/tweets",serializeData,function(response){
      console.log(response)
    })

  })

})