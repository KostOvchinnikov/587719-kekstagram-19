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
      window.preview.showBig(obj);
    });

    return pictureElement;
  };

  var renderPictures = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var pictureElement = renderPicture(array[i]);
      fragment.appendChild(pictureElement);
    }
    pictureListElement.appendChild(fragment);
  };

  // renderPictures(window.load.parseData);
  renderPictures(window.data.data);

  window.picture = {
    pictures: renderPictures
  };
})();
