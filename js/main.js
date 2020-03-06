'use strict';

// data.js

/*

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var namesData = [
  'Артем',
  'Игорь',
  'Егор',
  'Антон',
  'Алексей',
  'Ангелина',
  'Анжелика',
  'Ибрагим',
  'Анатолий',
  'Евгений',
  'Мария'
];

var messageData = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptionData = [
  'Офигенская фотка!',
  'Зацените как снимает новый iPhone',
  'Смотри чего умею!',
  'Случайное описание к фотографии.',
  'Еще более случайное описание'
];

var getRandomItem = function (array) {
  var randomIndex = getRandomInt(0, array.length - 1);
  return array[randomIndex];
};

getRandomItem(namesData);
getRandomItem(messageData);
getRandomItem(descriptionData);

var generateComments = function (number) {
  var commentsData = [];
  for (var j = 1; j <= number; j++) {
    commentsData.push({
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      name: getRandomItem(namesData),
      message: getRandomItem(messageData)
    });
  }
  return commentsData;
};

generateComments(Math.floor(Math.random() * 30));

var generateData = function (num) {
  var data = [];
  for (var i = 1; i <= num; i++) {
    var likes = getRandomInt(15, 200);
    data.push({
      url: 'photos/' + [i] + '.jpg',
      description: getRandomItem(descriptionData),
      comments: generateComments(Math.floor(Math.random() * 10)),
      likes: likes
    });
  }
  return data;
};

var data = generateData(25);

*/


// picture.js

/*

var pictureListElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (obj) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = obj.url;
  pictureElement.querySelector('.picture__comments').textContent = obj.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = obj.likes;


  pictureElement.addEventListener('click', function () {
    window.showBigPicture(obj);
  });

  return pictureElement;
};

var renderPictures = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var pictureElement = renderPicture(array[i]);
    fragment.appendChild(pictureElement);
  }
  pictureListElement.appendChild(fragment);
};

renderPictures(data);


var commentsList = document.querySelector('.social__comments');
var commentListElement = document.querySelector('.social__comment');

var renderComments = function (array) {
  var commentFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    var commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = array[i].avatar;
    commentElement.querySelector('.social__picture').alt = array[i].name;
    commentElement.querySelector('.social__picture').width = '35';
    commentElement.querySelector('.social__picture').height = '35';
    commentElement.querySelector('.social__text').textContent = array[i].message;
    commentFragment.appendChild(commentElement);
  }
  commentsList.appendChild(commentFragment);

};

*/

// preview.js


/*
var bigPicture = document.querySelector('.big-picture');
var closePicture = bigPicture.querySelector('.big-picture__cancel');
var textArea = document.querySelector('.social__footer-text');

var onPressEsc = function (evt) {
  if (textArea !== document.activeElement && evt.keyCode === window.ESC) {
    closeBigPicture();
  }
};

var showBigPicture = function (obj) {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  renderComments(obj.comments);
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = obj.url;
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt = obj.description;
  bigPicture.querySelector('.social__caption').textContent = obj.description;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  document.addEventListener('keydown', onPressEsc);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPressEsc);
};

closePicture.addEventListener('click', function () {
  closeBigPicture();
});

*/


// form.js

/*
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

uploadButton.addEventListener('change', function (evt) {
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
*/
