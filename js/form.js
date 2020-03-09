'use strict';

(function () {
  var ESC = 27;
  var uploadButton = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__overlay');
  var cancelButton = editForm.querySelector('#upload-cancel');
  var commentArea = editForm.querySelector('.text__description');

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
    document.addEventListener('keydown', pressEsc);
  };

  var cancelForm = function () {
    editForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', pressEsc);
  };


  // Заменить на change
  uploadButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openForm();
  });

  cancelButton.addEventListener('click', function () {
    cancelForm();
  });

  var hashtags = editForm.querySelector('.text__hashtags');
  var regexp = /[$%@#]+$/;
  var MAX_HASH_CHARACTERS = 20;
  var MAX_HASH = 5;

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

  var MIN_LEVEL_PIN = 0;
  var MAX_LEVEL_PIN = 450;


  var effectPin = editForm.querySelector('.effect-level__pin');
  var effectDepth = editForm.querySelector('.effect-level__depth');

  effectPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (effectPin.offsetLeft <= MAX_LEVEL_PIN
        && effectPin.offsetLeft >= MIN_LEVEL_PIN) {
        effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
        effectDepth.style.width = (effectDepth.offsetWidth - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

