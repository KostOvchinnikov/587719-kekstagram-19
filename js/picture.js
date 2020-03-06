'use strict';

var pictureListElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (obj) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = obj.url;
  pictureElement.querySelector('.picture__comments').textContent = obj.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = obj.likes;


  pictureElement.addEventListener('click', function () {
    window.showBigPicture(obj);
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

renderPictures(window.data);


var commentsList = document.querySelector('.social__comments');
var commentListElement = document.querySelector('.social__comment');

var renderComments = function (array) {
  var commentFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    var commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = array[i].avatar;
    commentElement.querySelector('.social__picture').alt = array[i].name;
    commentElement.querySelector('.social__picture').width = '35';
    commentElement.querySelector('.social__picture').height = '35';
    commentElement.querySelector('.social__text').textContent = array[i].message;
    commentFragment.appendChild(commentElement);
  }
  commentsList.appendChild(commentFragment);

};
