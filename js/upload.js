'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#upload-file');
  var previewImg = document.querySelector('.img-upload__preview').querySelector('img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
