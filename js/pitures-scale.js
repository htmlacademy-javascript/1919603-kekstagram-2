// Масштабирование изображения в форме загрузки изображения
import {SCALE_MAX, SCALE_MIN, SCALE_STEP} from './data.js';

const formElement = document.querySelector('.img-upload__form');
const scaleControlValueElement = formElement.querySelector('.scale__control--value');
const previewImageElement = formElement.querySelector('.img-upload__preview img');

let scale = 100;

function changeScale () {
  scaleControlValueElement.setAttribute('value', `${scale}%`);
  previewImageElement.style.transform = `scale(${scale / 100})`;
}

function minusScale () {
  if (scale > SCALE_MIN) {
    scale -= SCALE_STEP;
    changeScale();
  }
}

function plusScale () {
  if (scale < SCALE_MAX) {
    scale += SCALE_STEP;
    changeScale();
  }
}

function resetScale () {
  scale = 100;
  changeScale();
}

export { minusScale, plusScale, resetScale };
