'use strict';
(function () {
  var RANDOM_DATA_COUNT = 10;
  var imgFilters = document.querySelector('.img-filters');
  var filterDefault = imgFilters.querySelector('#filter-default');
  var filterRandom = imgFilters.querySelector('#filter-random');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');

  var onClickRandom = function () {
    window.picture.render(getRandomData());
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
  };

  var onClickRandomDebounce = window.debounce(onClickRandom);
  filterRandom.addEventListener('click', onClickRandomDebounce);

  var onClickDiscussed = function () {
    var data = window.picture.getData().slice();

    data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    window.picture.render(data);
    filterRandom.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
  };

  var onClickDiscussedDebounce = window.debounce(onClickDiscussed);
  filterDiscussed.addEventListener('click', onClickDiscussedDebounce);

  var onClickDefault = function () {
    window.picture.render(window.picture.getData());
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.add('img-filters__button--active');
  };

  var onClickDefaultDebounce = window.debounce(onClickDefault);
  filterDefault.addEventListener('click', onClickDefaultDebounce);

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomData = function () {
    var data = window.picture.getData().slice();
    var randomData = [];
    for (var i = 0; i < RANDOM_DATA_COUNT; i++) {
      var randomIndex = getRandomInt(0, data.length - 1);
      var cut = data.splice(randomIndex, 1);
      randomData.push(cut[0]);
    }
    return randomData;
  };
})();
