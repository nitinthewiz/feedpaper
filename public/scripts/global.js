App.populator('feed', function (page, data) {

  function successCb(data, status, xhr) {
    $(page).find('.app-list').children().remove();
    data.forEach(function (article) {
      var li = $('<li class="app-button">' + article.title + '</li>');
      li.on('click', function () {
        App.load('article', article);
      });
      $(page).find('.app-list').append(li);
    });
  }

  function errorCb(xhr, errType, err) {
    $(page).find('.app-list').children().remove();
    var li = $('<li class="app-button">' + err + ' - ' + xhr.responseText + '</li>');
    $(page).find('.app-list').append(li);
  }

  $(page).find('.app-title').text(data.title);

  $.ajax({
    type    : 'GET',
    url     : '/data/feed/' + data.id + '/articles',
    dataType: 'json',
    success : successCb,
    error   : errorCb
  });

});

App.populator('article', function (page, data) {

  function successCb(data, status, xhr) {
    var content =
      '<p><strong>' + data.title + '</strong><br/>' +
      '<a href="' + data.url + '">' + data.source + '</a></p>' +
      data.content;
    $(page).find('#article').html(content);
  }

  function errorCb(xhr, errType, err) {
    $(page).find('#article').html(err + ' - ' + xhr.responseText);
  }

  $(page).find('.app-title').text(data.title);

  $.ajax({
    type    : 'GET',
    url     : '/data/article/' + data.url,
    dataType: 'json',
    success : successCb,
    error   : errorCb
  });
});