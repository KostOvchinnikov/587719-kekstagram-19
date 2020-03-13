'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  var statusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var upload = function (data, onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Данные не успели отправиться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = upload;

})();
