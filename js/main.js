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
  for (var i = 0; i < array.length; i++) {
    var commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = array[i].avatar;
    commentElement.querySelector('.social__picture').alt = array[i].name;
    commentElement.querySelector('.social__picture').width = '35';
    commentElement.querySelector('.social__picture').height = '35';
    commentElement.querySelector('.social__text').textContent = array[i].message;
    commentFragment.appendChild(commentElement);
    commentsList.appendChild(commentElement);
  }

};


var INDEX = 3;
var bigPicture = document.querySelector('.big-picture');
var countComments = document.querySelector('.social__comment-count');
var loaderComments = document.querySelector('.comments-loader');
var body = document.querySelector('body');
var photo = document.querySelector('.big-picture__img').querySelector('img');
var photoDescription = document.querySelector('.social__caption');
var photoLikes = document.querySelector('.likes-count');

var showBigPicture = function (array) {
  countComments.classList.add('hidden');
  loaderComments.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  renderComments(array[INDEX].comments);
  photo.src = array[INDEX].url;
  photo.alt = array[INDEX].description;
  photoDescription.textContent = array[INDEX].description;
  photoLikes.textContent = array[INDEX].likes;
};

showBigPicture(data);

