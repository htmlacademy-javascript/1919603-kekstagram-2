import {isEscapeKey, cancelEscKeydown} from './utils.js';
import {isValidType, pristine} from './validate-form.js';
import {minusScale, plusScale, resetScale} from './pitures-scale.js';
import {onEffectRadioButtonClick, resetFilter} from './slider-effects.js';

const formElement = document.querySelector('.img-upload__form');
const imgUploadInput = formElement.querySelector('.img-upload__input');
const formModalElement = formElement.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const closeImgButton = formElement.querySelector('.img-upload__cancel');
const textDescriptionInput = formElement.querySelector('.text__description');
const textHashtagsInput = formElement.querySelector('.text__hashtags');
const minusButton = formElement.querySelector('.scale__control--smaller');
const plusButton = formElement.querySelector('.scale__control--bigger');
const effectsListElement = formElement.querySelector('.effects__list');

const picturePreviewElement = formElement.querySelector('.img-upload__preview img');
const effectsPreviewsElement = formElement.querySelectorAll('.effects__preview');
const submitButton = formElement.querySelector('.img-upload__submit');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function changeImage () {
  const file = imgUploadInput.files[0];
  if (file && isValidType(file)) {
    picturePreviewElement.src = URL.createObjectURL(file);
    effectsPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${picturePreviewElement.src}')`;
    });
  }
}

// открытие формы загрузки изображения
function openForm () {
  changeImage ();
  formModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  closeImgButton.addEventListener('click', closeForm);
  textDescriptionInput.addEventListener('keydown', cancelEscKeydown);
  textHashtagsInput.addEventListener('keydown', cancelEscKeydown);
}

// закрытие формы и удаление обработчиков, а так же очистка формы
function closeForm () {
  formModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  textDescriptionInput.removeEventListener('keydown', cancelEscKeydown);
  textHashtagsInput.removeEventListener('keydown', cancelEscKeydown);

  pristine.reset();
  formElement.reset();
  resetScale();
  resetFilter();
}

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

minusButton.addEventListener('click', minusScale);
plusButton.addEventListener('click', plusScale);
effectsListElement.addEventListener('change', onEffectRadioButtonClick);

export {openForm, imgUploadInput, blockSubmitButton, unblockSubmitButton, closeForm};
