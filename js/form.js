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
  var imgPreview = editForm.querySelector('.img-upload__preview');
  var effectLevel = editForm.querySelector('.effect-level');

  var scaleX = DEFAULT_SCALE_VALUE;

  var onClickSmaller = function () {
    if (scaleX <= MAX_SCALE_VALUE &&
      scaleX > MIN_SCALE_VALUE) {
      scaleX -= SCALE_VALUE_STEP;
      scale.value = scaleX + '%';
      imgPreview.style.transform = 'scale(' + (scaleX / 100) + ')';
    }
  };

  var onClickBigger = function () {
    if (scaleX >= MIN_SCALE_VALUE &&
      scaleX < MAX_SCALE_VALUE) {
      scaleX += SCALE_VALUE_STEP;
      scale.value = scaleX + '%';
      imgPreview.style.transform = 'scale(' + (scaleX / 100) + ')';
    }
  };


  var pressEsc = function (evt) {
    if (hashtags !== document.activeElement
      && commentArea !== document.activeElement
      && evt.keyCode === ESC) {
      cancelForm();
    }
  };

  var openForm = function () {
    document.querySelector('body').classList.add('modal-open');
    editForm.classList.remove('hidden');
    scale.value = DEFAULT_SCALE_VALUE + '%';
    effectLevel.classList.add('hidden');
    scaleSmaller.addEventListener('click', onClickSmaller);
    scaleBigger.addEventListener('click', onClickBigger);
    document.addEventListener('keydown', pressEsc);
    editForm.addEventListener('click', onClickOut);
  };

  var cancelForm = function () {
    editForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    scaleBigger.removeEventListener('click', onClickBigger);
    scaleSmaller.removeEventListener('click', onClickSmaller);
    imgPreview.style.transform = '';
    scaleX = DEFAULT_SCALE_VALUE;
    document.removeEventListener('keydown', pressEsc);
    editForm.removeEventListener('click', onClickOut);
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


  var onClickOut = function (evt) {
    if (evt.target.classList.contains('img-upload__overlay')) {
      cancelForm();
    }
  };

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

  // uploadForm.addEventListener('submit', function (evt) {
  //   evt.preventDefault();
  //   window.server.upload(new FormData(uploadForm), onSuccess, onError);
  // });

  var hashtags = editForm.querySelector('.text__hashtags');
  var regexp = /[$%@#*]+$/;

  hashtags.addEventListener('input', function () {
    var string = hashtags.value;
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
      } else if (hash.match(regexp)) {
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
