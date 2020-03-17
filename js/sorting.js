'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  var filterDefault = imgFilters.querySelector('#filter-default');
  var filterRandom = imgFilters.querySelector('#filter-random');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');

  var removePictures = function () {
    var picture = document.querySelectorAll('.picture');
    for (var i = 0; i < picture.length; i++) {
      picture[i].remove();
    }
  };

  filterRandom.addEventListener('click', function () {
    removePictures();

    // renderPictures(randomData);
  });
})();
