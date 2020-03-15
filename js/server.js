'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var getXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
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

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = getXhr(onSuccess, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = getXhr(onSuccess, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload
  };
})();
