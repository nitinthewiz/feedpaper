var FeedTouch = function () {
};
FeedTouch.prototype.loadFeed = function (feedUrl, maxDisplay, numElems) {
	var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&num=' + maxDisplay + '&q=' + feedUrl,
	    feed, entry, i, ln;
	for (i = 0; i < numElems; i++) {
	    $('li#' + i).hide();
	}
    $('li#indicator').text('Loading...');
	$('li#indicator').show();
	$.getJSON(url, function (data) {
		if (data.responseStatus === 200) {
			feed = data.responseData.feed;
		    $('li#indicator').hide();
		    $('h1#title').text(feed.title);
		    ln = (feed.entries.length > maxDisplay) ? maxDisplay : feed.entries.length;
		    for (i = 0; i < ln; i++) {
	 		    entry = feed.entries[i];
			    $('li#' + i + ' a').text(entry.title);
			    $('li#' + i + ' a').attr('data-transition', 'slide');
			    //$('li#' + i + ' a').attr('href', 'http://viewtext.org/article?url=' + entry.link);
			    $('li#' + i + ' a').attr('href', '/article?url=' + entry.link + '&title=' + entry.title);
			    $('li#' + i).show();
		    }
		} else {
		    $('li#indicator').text('Error - ' + data.responseDetails);
		    $('li#indicator').show();
		}
	});
};
FeedTouch.prototype.loadArticle = function (articleUrl) {
    var url = 'http://viewtext.org/api/text?url=' + articleUrl + '&callback=?';
    $.getJSON(url, function (data) {
        $('div#content').html('<p><a href=' + articleUrl + '>' + articleUrl + '</a></p>' + data.content);
    });
};