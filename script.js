var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    console.log('sciagam cytat z API');
    $.getJSON(quoteUrl, createTweet);
    $.ajaxSetup({
    	cache: false
    });
}

function createTweet(input) {
    console.log('sciagnalem cytat, przygotowuje tweeta');
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " author: " + quoteAuthor;
    if (tweetText.length > 140) {
        console.log('cytat za dlugi, musze pobrac inny cytat');
    	getQuote();
    } else {
        console.log('dlugosc cytatu jest ok, powinien pojawic sie na stronie')
    	var tweet = tweetLink + encodeURIComponent(tweetText);
    	$('.quote').text(quoteText);
    	$('.author').text("author: " + quoteAuthor);
    	$('.tweet').attr('href', tweet);
    }
}

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() {
        console.log('kliknales zeby pobrac nowy cytat')
		getQuote();
	})
});
