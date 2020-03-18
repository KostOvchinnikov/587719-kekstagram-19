'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  var filterDefault = imgFilters.querySelector('#filter-default');
  var filterRandom = imgFilters.querySelector('#filter-random');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');

  var onClickRandom = function () {
    window.picture.renderPictures(getRandomData());
  };

  var onClickRandomDebounce = window.debounce(onClickRandom);
  filterRandom.addEventListener('click', onClickRandomDebounce);

  var onClickDiscussed = function () {
    var data = window.picture.getData().slice();

    data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    window.picture.renderPictures(data);
  };

  var onClickDiscussedDebounce = window.debounce(onClickDiscussed);
  filterDiscussed.addEventListener('click', onClickDiscussedDebounce);

  var onClickDefault = function () {
    window.picture.renderPictures(window.picture.getData());
  };

  var onClickDefaultDebounce = window.debounce(onClickDefault);
  filterDefault.addEventListener('click', onClickDefaultDebounce);

  var getRandomData = function () {
    var data = window.picture.getData().slice();
    var randomData = [];
    for (var i = 0; i < 10; i++) {
      var randomIndex = window.data.getRandomInt(0, data.length - 1);
      var cut = data.splice(randomIndex, 1);
      randomData.push(cut[0]);
    }
    return randomData;
  };
})();
