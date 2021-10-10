//const { tweets } = require("../../server/lib/in-memory-db") 

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function () {
  $('.error-container').hide();
  
  const loadTweets = function(){
    $.ajax({
      url:'/tweets',
      method:'GET',
      dataType:'json',
      success:(tweets)=>{
        //console.log(tweets);
       renderTweets(tweets);
      },
      error:(err)=>{
       // console.err(err);
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
          <div class="text-div">${escape(tweet.content.text)}</div>
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
    const $tweetContainer =$('#tweets-container');
    $tweetContainer.empty();
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and ap pends it to the tweets container
      $tweetContainer.prepend($tweet);
    }
  }






  $("#new-tweet-form").on('submit', function(event){
    event.preventDefault(); 
    let typedCharactersCount =$(this).find('#tweet-text').val().length;
    if(typedCharactersCount===0){
      $( ".error-container" ).slideUp( "slow", function() {
        $('.error-message').text("No tweet content!!! type something")
      });
      $( ".error-container" ).slideDown( "slow")

      //alert("No tweet content!!! type something")
    }
    else if(typedCharactersCount >140){
      $( ".error-container" ).slideUp( "slow", function() {
        $('.error-message').text("Tweet content is too long!!!Character limit is 140")
      });
      $( ".error-container" ).slideDown( "slow")

     // alert("Tweet content is too long!!!Character limit is 140")
    }
    
    else{
      $( ".error-container" ).slideUp( "slow")

    //console.log($(this).find('#tweet-text').val().length);
    const serializeData =$(this).serialize();
    //console.log(serializeData);
    $.post("/tweets",serializeData,function(response){
      //console.log(response);
      loadTweets();
      //$('#tweet-text').val("");
      //$('.counter').val("140");
    })
    $('#tweet-text').val("");
    $('.counter').val("140");
    }
    //$('#tweet-text').val("");
    //$('.counter').val("140");
  })

})