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

  var showBigPicture = function (obj) {
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    window.picture.comments(obj.comments);
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
    big: showBigPicture()
  };
})();
