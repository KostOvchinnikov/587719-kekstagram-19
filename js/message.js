'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var body = document.querySelector('body');

  var renderSuccess = function () {
    var element = successTemplate.cloneNode(true);

    document.querySelector('main').appendChild(element);
    body.classList.add('modal-open');
    var successElement = document.querySelector('.success');
    var successButton = successElement.querySelector('.success__button');

    successElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('success')) {
        close();
      }
    });

    successButton.addEventListener('click', function () {
      close();
    });

    document.addEventListener('keydown', onPressEsc);
  };

  var renderError = function (error, button) {
    var element = errorTemplate.cloneNode(true);

    document.querySelector('main').appendChild(element);
    body.classList.add('modal-open');
    var errorElement = document.querySelector('.error');
    var errorButton = errorElement.querySelector('.error__button');
    errorElement.querySelector('.error__title').textContent = error;
    errorButton.textContent = button;

    errorElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('error')) {
        close();
      }
    });

    errorButton.addEventListener('click', function () {
      close();
    });

    document.addEventListener('keydown', onPressEsc);
  };

  var close = function () {
    var element = document.querySelector('.success,.error');
    if (element) {
      element.remove();
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', onPressEsc);
    }
  };

  var onPressEsc = function (evt) {
    if (evt.keyCode === window.common.ESC) {
      close();
    }
  };

  window.message = {
    success: renderSuccess,
    error: renderError
  };
})();
