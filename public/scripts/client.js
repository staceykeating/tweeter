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
      <img src="${escape(data.user.avatars)}"><h2>${escape(data.user.name)}</h2><h4>${escape(data.user.handle)}</h4>
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


$('form').submit(function(event) {
  //alert('Hello');
  event.preventDefault()  
  //const tweet = data.content.text;
  const self = this;
  const formData = $(this).serialize(); 

    $.post('/tweets', formData)
    .then(() => {
      $(self)[0].reset();
      renderTweets(formData);
    });
}); 
loadTweets();

const loadTweets = function() {
  $.getJSON('/tweets')
  .then((formData) => {
    renderTweets(formData);
  }); 
};
loadTweets();
});