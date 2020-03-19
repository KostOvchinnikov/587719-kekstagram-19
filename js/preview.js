'use strict';
(function () {

  var bigPicture = document.querySelector('.big-picture');
  var closePicture = bigPicture.querySelector('.big-picture__cancel');
  var textArea = document.querySelector('.social__footer-text');

  var onPressEsc = function (evt) {
    if (textArea !== document.activeElement && evt.keyCode === window.common.ESC) {
      closeBigPicture();
    }
  };

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

  var commentsData = [];

  var commentsCut = function (array) {
    commentsData = array.slice();
    console.log(commentsData);
    var cut = array.splice(0, 5);

  };

  var showBigPicture = function (obj) {
    // bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    // bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    renderComments(obj.comments);
    commentsCut(obj.comments);
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = obj.url;
    bigPicture.querySelector('.big-picture__img').querySelector('img').alt = obj.description;
    bigPicture.querySelector('.social__caption').textContent = obj.description;
    bigPicture.querySelector('.likes-count').textContent = obj.likes;
    document.addEventListener('keydown', onPressEsc);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPressEsc);
  };

  closePicture.addEventListener('click', function () {
    closeBigPicture();
  });

  window.preview = {
    showBig: showBigPicture
  };
})();
