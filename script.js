var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    // $.getJSON(prefix + quoteUrl, createTweet);   chwilowe wylaczenie kodu zeby sprawdzic czy dziala :)
    $.ajaxSetup({ 
    cache: false,
    headers: {
        "Access-Control-Allow-Headers":"X-Requested-With"
    }
});
}

function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " author: " + quoteAuthor;
    if (tweetText.length > 140) {
    	getQuote();
    } else {
    	var tweet = tweetLink + encodeURIComponent(tweetText);
    	$('.quote').text(quoteText);
    	$('.author').text("author: " + quoteAuthor);
    	$('.tweet').attr('href', tweet);
    } 
}

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() {
		getQuote();
	})
});

