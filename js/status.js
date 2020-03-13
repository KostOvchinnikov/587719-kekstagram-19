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

    // successElement.addEventListener('click', function () {
    //   if (!successInner) {
    //     close();
    //   }
    // });

    successButton.addEventListener('click', function () {
      close();
      document.querySelector('body').classList.remove('modal-open');
    });
  };

  var renderErorr = function () {
    var element = errorTemplate.cloneNode(true);

    document.querySelector('main').appendChild(element);
    document.querySelector('body').classList.add('modal-open');
  };

  var close = function () {
    var element = document.querySelector('.success,.error');
    if (element) {
      element.remove();
    }
  };

  var render = function (status) {
    if (status === 'success') {
      renderSuccess();
    } else if (status === 'error') {
      renderError();
    }
  };

  window.status = {
    renderSuccess: renderSuccess,
    render: render
  };
})();
