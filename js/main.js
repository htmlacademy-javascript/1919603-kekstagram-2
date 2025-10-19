const arrPhotoDescriptions = [
  'Случайное описание 1',
  'Случайное описание 2',
  'Случайное описание 3'
];

const arrCommentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

const arrCommentNames = [
  'Kate',
  'Nick',
  'Alex',
  'John'
];

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 1000);

function generatePhotoArr () {
  const photoArr = [];
  for(let i = 0; i <= 24; i++) {
    photoArr.push(
      {
        id: i + 1,
        url: `photos/${i + 1}.jpg`,
        description: arrPhotoDescriptions[getRandomInteger(0, 2)],
        likes: getRandomInteger(15, 200),
        comments: generateCommentsArr(getRandomInteger(0, 30))
      }
    );
  }
  return photoArr;
}

function generateCommentsArr (arrLength) {
  const commentsArr = [];
  for (let i = 0; i <= (arrLength - 1); i++) {
    commentsArr.push (
      {
        id: generatePhotoId(),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: arrCommentMessages[getRandomInteger(0, 1)],
        name: arrCommentNames[getRandomInteger(0, 3)]
      }
    );
  }
  return commentsArr;
}

generatePhotoArr();
