import {PHOTO_DESCRIPTIONS, COMMENT_MESSAGES, COMMENT_NAMES} from './data.js';
import {getRandomInteger, createRandomNonRepeatingNumber} from './util.js';

// записываем функцию с нужным диапазоном
const generateCommentId = createRandomNonRepeatingNumber(1, 1000);

// функция генерации масиива фото-карточек
function generatePhotoArr () {
  const photoArr = [];
  for(let i = 0; i <= 24; i++) {
    photoArr.push(
      {
        id: i + 1,
        url: `photos/${i + 1}.jpg`,
        description: PHOTO_DESCRIPTIONS[getRandomInteger(0, 2)],
        likes: getRandomInteger(15, 200),
        comments: generateCommentsArr(getRandomInteger(0, 30))
      }
    );
  }
  return photoArr;
}

// функция генерации масиива комментариев к фото-карточкам
function generateCommentsArr (arrLength) {
  const commentsArr = [];
  for (let i = 0; i <= (arrLength - 1); i++) {
    commentsArr.push (
      {
        id: generateCommentId(),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: COMMENT_MESSAGES[getRandomInteger(0, 1)],
        name: COMMENT_NAMES[getRandomInteger(0, 3)]
      }
    );
  }
  return commentsArr;
}

export {generatePhotoArr};
