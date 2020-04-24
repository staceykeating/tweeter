$(document).ready(function() {
  
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //template to add tweets into tweet section of html\\
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
    `;
    return $tweet;
  };

  const renderTweets = function(data) {
    $('.tweets').empty();
    for (let tweet of data) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };
  
  const loadTweets = function() {
    $.getJSON('/tweets')
      .then((formData) => {
        renderTweets(formData);
      });
  };

  $('form').submit(function(event) {
    event.preventDefault();
    const self = this;
    const formData = $(this).serialize();
    const tweetText = $('#tweet-text').val();
    const tweetLength = tweetText.length;
    const counter = $(this).closest("section.new-tweet").find("#counter");

    if (tweetLength <= 140 && tweetLength > 0) { //make sure tweet is within char limits
      $.post('/tweets', formData)
        .then(() => {
          $('.minExceed').hide();               //hide error messages if previous errors before submit
          $('.maxExceed').hide();
          $(self)[0].reset();
          counter.text(140);
          loadTweets();
        });
    } else if (tweetLength > 140) {
      $.post('/tweets');
      $('.minExceed').hide();
      $('.maxExceed').show();
    } else if (tweetLength < 1) {
      $.post('/tweets');
      $('.maxExceed').hide();
      $('.minExceed').show();
    }
  });
  
  loadTweets();
  
  $(".form-toggle").click(function() {                //toggle button on navigation bar collapse/expand new tweet box
    if ($('.new-tweet').css('display') == 'none') {
      $('.new-tweet').show();
    } else {
      $('.new-tweet').hide();
    }
  });

});