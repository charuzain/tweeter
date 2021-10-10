/* Client-side JS logic */
//--------------Cross-Site Scripting-------------------------------------------------
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  $('.error-container').hide();
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
      }
    });
  };
  loadTweets();

  //---------------Put tweets into html format-------------------------------------
  const createTweetElement = function(tweet) {
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
  };
  //-----------Function to render tweets to DOM-----------------------------------------
  const renderTweets = function(tweets) {
    const $tweetContainer = $('#tweets-container');
    $tweetContainer.empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  };

  //-------------Event listener for the submit button---------------------------------------
  $("#new-tweet-form").on('submit', function(event) {
    event.preventDefault();
    let typedCharactersCount = $(this).find('#tweet-text').val().length;
    if (typedCharactersCount === 0 || $(this).find('#tweet-text').val().trim() === "") {
      $(".error-container").slideUp("slow", function() {
        $('.error-message').text("No tweet content!!! Type something");
      });
      $(".error-container").slideDown("slow");
    } else if (typedCharactersCount > 140) {
      $(".error-container").slideUp("slow", function() {
        $('.error-message').text("Tweet content is too long!!!Character limit is 140");
      });
      $(".error-container").slideDown("slow");
    } else {
      $(".error-container").slideUp("slow");
      const serializeData = $(this).serialize();
      $.post("/tweets", serializeData, function(response) {
        loadTweets();
      });
      $('#tweet-text').val("");
      $('.counter').val("140");
    }
  });

});