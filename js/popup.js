'use strict';

(function () {
  // var successTemplate = document.querySelector('#success').content.querySelector('.success');
  // var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderPopup = function (template) {
    var popupElement = template.cloneNode(true);

    document.querySelector('main').appendChild(popupElement);
    document.querySelector('body').classList.add('modal-open');
    var successPopup = document.querySelector('.success');
    var successButton = successPopup.querySelector('.success__button');


    successButton.addEventListener('click', function () {
      removePopup();
      document.querySelector('body').classList.remove('modal-open');
      console.log('Круто');
    });
  };

  var removePopup = function (template) {

  };


  window.popup = {
    renderPopup: renderPopup,
    removePopup: removePopup
  };
})();
