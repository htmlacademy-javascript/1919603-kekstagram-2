// Рендерим карточки и сразу присваиваем обработчик,
// в котором передаем данные для карточки в большом окне

import {openPictureWindow} from './pictures-modal.js';

const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');
const picturesListElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

function renderPictures (arr) {
  picturesListElement.querySelectorAll('.picture').forEach((element) => element.remove());
  arr.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    fragment.append(pictureElement);

    pictureElement.addEventListener('click', (event) => {
      event.preventDefault();
      openPictureWindow(url, description, likes, comments);
    });
  });

  picturesListElement.append(fragment);
}

export {renderPictures};
