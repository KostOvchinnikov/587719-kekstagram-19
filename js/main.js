'use strict';

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

var pictureListElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPictures = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = array[i].url;
    pictureElement.querySelector('.picture__comments').textContent = array[i].comments.length;
    pictureElement.querySelector('.picture__likes').textContent = array[i].likes;
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

var bigPicture = document.querySelector('.big-picture');

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
};

// showBigPicture(data[11]);

var uploadButton = document.querySelector('#upload-file');
var editForm = document.querySelector('.img-upload__overlay');
var cancelButton = editForm.querySelector('#upload-cancel');


// Заменить на 'change';
uploadButton.addEventListener('change', function (evt) {
  evt.preventDefault();
  document.querySelector('body').classList.add('modal-open');
  editForm.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      editForm.classList.add('hidden');
    }
  });
});

cancelButton.addEventListener('click', function () {
  editForm.classList.add('hidden');
});


// Фильтр приближения фотографии.

// var scaleControl = editForm.querySelector('.scale__control--value');
// var controlSmaller = editForm.querySelector('.scale__control--smaller');
// var controlBigger = editForm.querySelector('.scale__control--bigger');

// scaleControl.value = 50;

// var controlValue = function (obj) {
//   if (obj.value > 0) {
//     controlSmaller.addEventListener('click', function () {
//       obj.value = Math.floor(obj.value - ((obj.value / 100) * 25));
//     });
//   }

//   if (obj.value < 100) {
//     controlBigger.addEventListener('click', function () {
//       obj.value = Math.floor(obj.value + ((obj.value / 100) * 25));
//     });
//   }

//   return obj.value;
// };

/*

controlSmaller.addEventListener('click', function () {
  if (scaleControl.value >= 0) {
    Math.floor(scaleControl.value - ((scaleControl.value / 100) * 25));
  }

  return scaleControl.value;
});

controlBigger.addEventListener('click', function () {
  if (scaleControl.value <= 100) {
    Math.floor(scaleControl.value + ((scaleControl.value / 100) * 25));
  }

  return scaleControl.value;
});

*/
var hashtags = editForm.querySelector('.text__hashtags');
// MAX_TAGS = 20;

hashtags.addEventListener('invalid', function (evt) {
  if (!hashtags.value.startsWith('#')) {
    hashtags.setCustomValidity('Хэштег должен начинаться с #');
  }
});

if (!hashtags.value.startsWith('#')) {
  hashtags.pushErrorMessage('Хэштег должен начинаться с #');
}
