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

// console.log(getComments());

var generateData = function (num) {
  var data = [];
  for (var i = 1; i <= num; i++) {
    var likes = getRandomInt(15, 200);
    var comments = Math.floor(Math.random() * 30);
    data.push({
      url: 'photos/' + [i] + '.jpg',
      description: '',
      comments: comments,
      likes: likes
    });
  }
  return data;
};

var getRandomItem = function (array) {
  var randomIndex = getRandomInt(0, array.length - 1);
  return array[randomIndex];
};

getRandomItem(namesData);
getRandomItem(messageData);

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

generateComments(25);

// console.log(commentsData);

var data = generateData(25);

// console.log(data);

var pictureListElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = data[i].url;
    pictureElement.querySelector('.picture__comments').textContent = data[i].comments;
    pictureElement.querySelector('.picture__likes').textContent = data[i].likes;
    fragment.appendChild(pictureElement);
  }
  pictureListElement.appendChild(fragment);
};

renderPictures();

// console.log(renderPictures());
