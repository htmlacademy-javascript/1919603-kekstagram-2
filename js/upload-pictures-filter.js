import {debounce} from './utils.js';
import {renderPictures} from './render-pictures.js';
import {PICTURES_COUNT, Filter} from './data.js';

const filterElement = document.querySelector('.img-filters');

let currentFilter = '';
let pictures = [];

function turnFilterOn (loadedPictures) {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = Filter.DEFAULT;
  return pictures;
}

function randomSort () {
  return Math.random() - 0.5;
}

function discussedSort (pictureA, pictureB) {
  return pictureA.comments.length - pictureB.comments.length;
}

function filterPictures () {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(randomSort).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(discussedSort).reverse();
    default:
      return [...pictures];
  }
}

const debouncedRenderPictures = debounce(renderPictures);

function onFilterPictures (evt) {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  debouncedRenderPictures(filterPictures());
}

filterElement.addEventListener('click', onFilterPictures);

export {turnFilterOn, filterPictures};
