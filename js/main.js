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

var generateData = function (num) {
  var data = [];
  for (var i = 1; i <= num; i++) {
    var getMessage = messageData[getRandomInt(0, 5)];
    var getLikes = getRandomInt(15, 200);
    var getComments = Math.floor(Math.random() * 30);

    data.push ({
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: getMessage,
      name: namesData[getRandomInt(0, 10)],
      url: 'photos/' + [i] + '.jpg',
      description: '',
      likes: getLikes,
      comments: getComments
    })

  }
  return data;
};

var data = generateData(25);

// console.log(data);
