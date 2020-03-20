'use strict';

(function () {
  var pictureListElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


  var renderPicture = function (obj) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = obj.url;
    pictureElement.querySelector('.picture__comments').textContent = obj.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = obj.likes;

    pictureElement.addEventListener('click', function () {
      window.preview(obj);
    });

    return pictureElement;
  };

  var renderPictures = function (array) {
    removePictures();
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });

    pictureListElement.appendChild(fragment);
  };

  var imgFilters = document.querySelector('.img-filters');

  var onSuccess = function (array) {
    data = array;
    renderPictures(array);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var data = [];

  var getData = function () {
    return data;
  };

  var removePictures = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      item.remove();
    });
  };

  var onError = function (error) {
    error();
  };

  window.server.load(onSuccess, onError);

  window.picture = {
    getData: getData,
    render: renderPictures
  };

})();
