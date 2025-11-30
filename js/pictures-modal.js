import {isEscapeKey} from './utils.js';
import {renderComments} from './render-picture-comments.js';

const pictureModalElement = document.querySelector('.big-picture');
const closeButtonElement = pictureModalElement.querySelector('.big-picture__cancel');
const commentsLoaderElement = pictureModalElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const commentShownCountElement = pictureModalElement.querySelector('.social__comment-shown-count');

// Временные переменные для обеспечения работоспособности функций openPictureWindow,
// loadingComments и удаления обработчика по клику
let temporaryСommentsArr = [];
let temporaryCommentsСount = 5;

// Закрытие окна по нажатию клавиши Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureWindow();
  }
}

// Заполнение данными открывшееся окно
function fillingPictureData (url, description, likes, comments) {
  pictureModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  temporaryСommentsArr = comments;

  pictureModalElement.querySelector('img').src = url;
  pictureModalElement.querySelector('.likes-count').textContent = likes;
  pictureModalElement.querySelector('.social__caption').textContent = description;
  pictureModalElement.querySelector('.social__comment-total-count').textContent = temporaryСommentsArr.length;

  return temporaryСommentsArr;
}

// Загрузка нужного числа комментариев при открытии окна
function renderRequiredNumberOfComments (arr) {
  if (arr.length <= 5) {
    renderComments(arr);

    commentShownCountElement.textContent = arr.length;
    commentsLoaderElement.classList.add('hidden');
  } else {
    const slicedArr = arr.slice(0, 5);

    renderComments(slicedArr);
    commentShownCountElement.textContent = 5;
  }
}

// Загрузка новых комментариев при нажатии на "Загрузить еще"
function loadingComments () {
  temporaryCommentsСount += 5;

  if (temporaryСommentsArr.length - temporaryCommentsСount <= 0) {
    commentsLoaderElement.classList.add('hidden');

    const slicedArr = temporaryСommentsArr.slice(0, temporaryСommentsArr.length);

    renderComments(slicedArr);
    commentShownCountElement.textContent = temporaryСommentsArr.length;
  } else {
    const slicedArr = temporaryСommentsArr.slice(0, temporaryCommentsСount);

    renderComments(slicedArr);
    commentShownCountElement.textContent = temporaryCommentsСount;
  }
}

// Открытие и отрисовка карточки в большом окне
function openPictureWindow (url, description, likes, comments) {

  fillingPictureData(url, description, likes, comments);

  renderRequiredNumberOfComments(temporaryСommentsArr);

  commentsLoaderElement.addEventListener('click', loadingComments);
  closeButtonElement.addEventListener('click', closePictureWindow);
}

// Закрытие большого окна карточки и удаление обработчиков
function closePictureWindow () {
  pictureModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  commentsLoaderElement.removeEventListener('click', loadingComments);

  temporaryCommentsСount = 5;
}

export {openPictureWindow};
