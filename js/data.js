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
