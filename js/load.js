'use strict';
/*
(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
  // var StatusCode = {
  //   OK: 200
  // };
  var TIMEOUT_IN_MS = 10000;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    var parseData = JSON.parse(xhr.responseText);
    // console.log(JSON.parse(xhr.responseText));
    return parseData;
  });

  xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
  xhr.send();

  window.load = {
    parseData: parseData
  };

  // window.load = function (onSuccess, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   // xhr.addEventListener('load', function () {
  //   //   // if (xhr.status === StatusCode.OK) {
  //   //   //   onSuccess(xhr.response);
  //   //   // } else {
  //   //   //   onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //   //   // }
  //   //   console.log(JSON.parse(xhr.responseText));
  //   // });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });

  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос неуспел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = TIMEOUT_IN_MS;

  //   xhr.open('GET', URL);
  //   xhr.send();
  // };

  // console.log(window.xhr.statusText);
})();
*/
(function () {

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    console.log(JSON.parse(xhr.responseText));
    var parseData = JSON.parse(xhr.responseText);
    // console.log(parseData);

    window.load = {
      parseData: parseData
    };
  });

  xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
  xhr.send();

})();
