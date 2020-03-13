'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderSuccess = function () {
    var element = successTemplate.cloneNode(true);

    document.querySelector('main').appendChild(element);
    document.querySelector('body').classList.add('modal-open');
    var successElement = document.querySelector('.success');
    var successButton = successElement.querySelector('.success__button');
    // var successInner = successElement.querySelector('.success__inner');

    successElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('success')) {
        close();
      }
    });

    successButton.addEventListener('click', function () {
      close();
    });

    document.addEventListener('keydown', pressEsc);
  };

  var renderError = function () {
    var element = errorTemplate.cloneNode(true);

    document.querySelector('main').appendChild(element);
    document.querySelector('body').classList.add('modal-open');
    var errorElement = document.querySelector('.error');
    var errorButton = errorElement.querySelector('.error__button');

    errorElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('error')) {
        close();
      }
    });

    errorButton.addEventListener('click', function () {
      close();
    });

    document.addEventListener('keydown', pressEsc);
  };

  var close = function () {
    var element = document.querySelector('.success,.error');
    if (element) {
      element.remove();
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', pressEsc);
    }
  };

  var pressEsc = function (evt) {
    if (evt.keyCode === window.common.ESC) {
      close();
    }
  };

  var render = function (status) {
    if (status === 'success') {
      renderSuccess();
    } else if (status === 'error') {
      renderError();
    }
  };

  window.message = render;
})();
