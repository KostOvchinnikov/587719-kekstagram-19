'use strict';
(function () {

  var COUNT_COMMENTS = 5;
  var bigPicture = document.querySelector('.big-picture');
  var closePicture = bigPicture.querySelector('.big-picture__cancel');
  var textArea = document.querySelector('.social__footer-text');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var onPressEsc = function (evt) {
    if (textArea !== document.activeElement && evt.keyCode === window.common.ESC) {
      closeBigPicture();
    }
  };

  var commentsList = document.querySelector('.social__comments');
  var commentListElement = document.querySelector('.social__comment');
  var commentsData = [];
  var startIndex = 0;

  var renderComments = function (array) {
    commentsList.innerHTML = '';
    commentsData = array;
    startIndex = 0;

    loadNextComments();
  };

  var updateCountComments = function () {
    if (startIndex >= commentsData.length) {
      commentCount.textContent = commentsData.length + ' из ' + commentsData.length + ' комментариев';
    } else {
      commentCount.textContent = startIndex + ' из ' + commentsData.length + ' комментариев';
    }
  };

  var loadNextComments = function () {
    var array = commentsData.slice(startIndex, startIndex + COUNT_COMMENTS);
    var commentFragment = document.createDocumentFragment();
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
    startIndex += COUNT_COMMENTS;

    if (startIndex >= commentsData.length) {
      commentsLoader.classList.add('hidden');
    }

    updateCountComments();
  };

  commentsLoader.addEventListener('click', function () {
    loadNextComments();
  });

  var showBigPicture = function (obj) {
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    renderComments(obj.comments);
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = obj.url;
    bigPicture.querySelector('.big-picture__img').querySelector('img').alt = obj.description;
    bigPicture.querySelector('.social__caption').textContent = obj.description;
    bigPicture.querySelector('.likes-count').textContent = obj.likes;
    document.addEventListener('keydown', onPressEsc);
    bigPicture.addEventListener('click', onClickOut);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPressEsc);
    bigPicture.removeEventListener('click', onClickOut);
  };

  closePicture.addEventListener('click', function () {
    closeBigPicture();
  });


  var onClickOut = function (evt) {
    if (evt.target.classList.contains('big-picture__preview')) {
      closeBigPicture();
    }
  };

  window.preview = {
    showBig: showBigPicture
  };
})();
