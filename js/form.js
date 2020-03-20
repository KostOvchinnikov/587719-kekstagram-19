'use strict';

(function () {
  var ESC = 27;
  var MAX_HASH_CHARACTERS = 20;
  var MAX_HASH = 5;
  var MAX_SCALE_VALUE = 100; // %
  var MIN_SCALE_VALUE = 25; // %
  var DEFAULT_SCALE_VALUE = 100; // %
  var SCALE_VALUE_STEP = 25; // %
  var uploadButton = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');
  var cancelButton = editForm.querySelector('#upload-cancel');
  var commentArea = editForm.querySelector('.text__description');
  var scale = editForm.querySelector('.scale__control--value');
  var scaleSmaller = editForm.querySelector('.scale__control--smaller');
  var scaleBigger = editForm.querySelector('.scale__control--bigger');
  var imgPreview = editForm.querySelector('.img-upload__preview > img');
  var effectLevel = editForm.querySelector('.effect-level');
  var body = document.querySelector('body');

  var scaleX = DEFAULT_SCALE_VALUE;

  var onClickSmaller = function () {
    if (scaleX <= MAX_SCALE_VALUE &&
      scaleX > MIN_SCALE_VALUE) {
      scaleX -= SCALE_VALUE_STEP;
      setScale(scaleX);
    }
  };

  var onClickBigger = function () {
    if (scaleX >= MIN_SCALE_VALUE &&
      scaleX < MAX_SCALE_VALUE) {
      scaleX += SCALE_VALUE_STEP;
      setScale(scaleX);
    }
  };

  var setScale = function (value) {
    scale.value = value + '%';
    imgPreview.style.transform = 'scale(' + (value / 100) + ')';
  };

  var onPressEsc = function (evt) {
    if (hashtags !== document.activeElement
      && commentArea !== document.activeElement
      && evt.keyCode === ESC) {
      cancelForm();
    }
  };

  var openForm = function () {
    body.classList.add('modal-open');
    editForm.classList.remove('hidden');
    scale.value = DEFAULT_SCALE_VALUE + '%';
    effectLevel.classList.add('hidden');
    scaleSmaller.addEventListener('click', onClickSmaller);
    scaleBigger.addEventListener('click', onClickBigger);
    document.addEventListener('keydown', onPressEsc);
  };

  var cancelForm = function () {
    editForm.classList.add('hidden');
    body.classList.remove('modal-open');
    scaleBigger.removeEventListener('click', onClickBigger);
    scaleSmaller.removeEventListener('click', onClickSmaller);
    imgPreview.style = '';
    scaleX = DEFAULT_SCALE_VALUE;
    document.removeEventListener('keydown', onPressEsc);
    uploadForm.reset();
    window.filter();
  };

  uploadButton.addEventListener('change', function (evt) {
    evt.preventDefault();
    openForm();
  });

  cancelButton.addEventListener('click', function () {
    cancelForm();
  });

  var onSuccess = function () {
    cancelForm();
    window.message.success();
  };

  var error = 'Ошибка соединения...';
  var errorButton = 'OK';

  var onError = function () {
    cancelForm();
    window.message.error(error, errorButton);
  };

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(uploadForm), onSuccess, onError);
  });

  var hashtags = editForm.querySelector('.text__hashtags');
  var regexp = /^#[а-яa-z\d]+$/;

  hashtags.addEventListener('input', function () {
    var string = hashtags.value.toLowerCase().trim();
    var hashtagsArray = string.split(' ');
    var errorMessage = '';

    if (hashtagsArray.length > MAX_HASH) {
      errorMessage = 'Нельзя указать больше ' + MAX_HASH + 'ти хэш-тегов!';
    }

    for (var i = 0; i < hashtagsArray.length; i++) {
      var hash = hashtagsArray[i];

      if (!hash.startsWith('#')) {
        errorMessage = 'Хэш-Тег должен начинаться с #';
        break;
      } else if (hash.length > MAX_HASH_CHARACTERS) {
        errorMessage = 'Не может содержать больше ' + MAX_HASH_CHARACTERS + ' символов!';
        break;
      } else if (hash.length === 1) {
        errorMessage = 'Хэш-Тег не может состоять из одного символа!';
        break;
      } else if (!regexp.test(hash)) {
        errorMessage = 'Хэш-Тег не должен содержать сторонних символов!';
        break;
      } else if (hashtagsArray.indexOf(hash) !== hashtagsArray.lastIndexOf(hash)) {
        errorMessage = 'Хэш-Теги не должны повторяться!';
        break;
      }
    }

    hashtags.setCustomValidity(errorMessage);

  });

})();
