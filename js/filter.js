'use strict';

(function () {

  var MIN_LEVEL_PIN = 0; // px
  var MAX_LEVEL_PIN = 450; // px
  var MAX_PERCANTAGE_VALUE = 100; // %
  var DEFAULT_PERCANTAGE_VALUE = 20; // %
  var editForm = document.querySelector('.img-upload__overlay');
  var fieldset = editForm.querySelector('.img-upload__effects');
  var imgPreview = editForm.querySelector('.img-upload__preview');
  var effectLevel = editForm.querySelector('.effect-level');


  fieldset.addEventListener('change', function () {
    setEffectFilter(MAX_PERCANTAGE_VALUE);
  });

  var setEffectFilter = function (percantage) {
    var checked = fieldset.querySelector('.effects__radio:checked');
    if (checked.value === 'chrome') {
      effectLevel.classList.remove('hidden');
      imgPreview.style.filter = 'grayscale(' + (percantage * 0.01) + ')';
    } else if (checked.value === 'sepia') {
      effectLevel.classList.remove('hidden');
      imgPreview.style.filter = 'sepia(' + percantage * 0.01 + ')';
    } else if (checked.value === 'marvin') {
      effectLevel.classList.remove('hidden');
      imgPreview.style.filter = 'invert(' + percantage + '%)';
    } else if (checked.value === 'phobos') {
      effectLevel.classList.remove('hidden');
      imgPreview.style.filter = 'blur(' + percantage * 0.03 + 'px)';
    } else if (checked.value === 'heat') {
      effectLevel.classList.remove('hidden');
      imgPreview.style.filter = 'brightness(' + (1 + percantage * 0.02) + ')';
    } else if (checked.value === 'none') {
      effectLevel.classList.add('hidden');
      imgPreview.style.filter = 'none';
    }

    var x = (percantage * MAX_LEVEL_PIN) / 100;

    effectPin.style.left = x + 'px';
    effectDepth.style.width = x + 'px';
  };

  var filterReset = function () {
    imgPreview.style.filter = 'none';
    setEffectFilter(DEFAULT_PERCANTAGE_VALUE);
  };

  var effectPin = editForm.querySelector('.effect-level__pin');
  var effectDepth = editForm.querySelector('.effect-level__depth');

  effectPin.addEventListener('mousedown', function (evt) {
    var startX = evt.clientX;
    var startOffsetLeft = effectPin.offsetLeft;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = moveEvt.clientX - startX;

      var x = startOffsetLeft + shiftX;
      x = Math.max(x, MIN_LEVEL_PIN);
      x = Math.min(x, MAX_LEVEL_PIN);

      var percant = Math.floor(x / (MAX_LEVEL_PIN / 100));
      setEffectFilter(percant);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.filter = filterReset;

})();

