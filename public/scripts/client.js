/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$.getJSON('/tweets')
.then(posts => {
})
;
  
const escape = function (str) {
  let div = document.createElement('div');
  // < => &lt; > => &gt;
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const createTweetElement = function(tweet) {
  let $tweet = `
   <article class= "boxed">
    <header>
      <h2><img src="${escape(user.avatars)}">${escape(user.name)}" alt=""></img>></h2><h4>${escape(user.handle)}</h4>
    </header>
    <p>${escape(content.text)}</p>
    <footer>
      <p>${escape(created_at)}</p><p><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></p>
    </footer>
  </article>
`
return $tweet;
}

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet)
    $tweetData.prepend(newTweet)
  }
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}


const $tweet = createTweetElement(data);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet);
