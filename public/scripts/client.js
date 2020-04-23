// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */
$(document).ready(function() {

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(data) {
  let $tweet = `
   <article class= "boxed"> 
    <header>
    <h2><img src="${escape(data.user.avatars)}">${escape(data.user.name)}</h2><h5 id="handle">${escape(data.user.handle)}</h5>
    </header>
    <p>${escape(data.content.text)}</p> 
    <footer>
      <p>${escape(data.created_at)}</p><p><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></p>
    </footer>
  </article>
`
return $tweet;
}

const renderTweets = function(data) {
  $('.tweets').empty();
  for (let tweet of data) {
    const $tweet = createTweetElement(tweet);
    $('.tweets').prepend($tweet);
  } 
};

//const $tweet = createTweetElement(data);

const loadTweets = function() {
  $.getJSON('/tweets')
  .then((formData) => {
    renderTweets(formData);
  }); 
};

$('form').submit(function(event) {
  event.preventDefault()  
  
  const self = this;
  const formData = $(this).serialize(); 
  const tweetText = $('#tweet-text').val();
  const tweetLength = tweetText.length
  console.log(tweetLength);

  if (tweetLength <= 140 && tweetLength > 0) {

    $.post('/tweets', formData)
    .then(() => {
      $('.minExceed').hide(); 
      $('.maxExceed').hide(); 
      $(self)[0].reset();
      loadTweets();
    });
  } 
  else if (tweetLength > 140) {
    $.post('/tweets')
    $('.maxExceed').show(); 
  }
  else if (tweetLength < 1) {
  $.post('/tweets')
  $('.minExceed').show(); 
  
  }
}); 
loadTweets();

});