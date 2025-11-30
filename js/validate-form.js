import {VALIDATE_COMMENT_ERROR, VALIDATE_HASHTAGS_ERROR, IMAGE_TYPES} from './data.js';
import {sendData} from './api.js';
import {addInfo} from './messages.js';
import {blockSubmitButton, unblockSubmitButton, closeForm} from './form.js';

const formElement = document.querySelector('.img-upload__form');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const textDescriptionInput = formElement.querySelector('.text__description');
const textHashtagsInput = formElement.querySelector('.text__hashtags');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__form',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Валидация комментариев
function validateComment (string) {
  return string.length <= 140;
}

pristine.addValidator(textDescriptionInput, validateComment, VALIDATE_COMMENT_ERROR);

// Валидация хэштэгов
function validateHashtags(string) {
  const tags = string.trim().split(/\s+/).filter(Boolean);

  if (tags.length > 5) {
    return false;
  }

  const lowerSet = new Set();

  for (const tag of tags) {
    if (!tag.startsWith('#')) {
      return false;
    }

    const tagBody = tag.slice(1);

    if (tagBody.length === 0) {
      return false;
    }

    if (!/^[\p{L}\p{N}]+$/u.test(tagBody)) {
      return false;
    }

    if (tag.length > 20) {
      return false;
    }

    const lowerTag = tag.toLowerCase();
    if (lowerSet.has(lowerTag)) {
      return false;
    }
    lowerSet.add(lowerTag);
  }

  return true;
}

pristine.addValidator(textHashtagsInput, validateHashtags, VALIDATE_HASHTAGS_ERROR);

function isValidType (file) {
  const fileName = file.name.toLowerCase();
  return IMAGE_TYPES.some((it) => fileName.endsWith(it));
}

// отправка формы и добавление уведомления об итогах отправки
function setFormSubmit () {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(formElement))
        .then(() => {
          addInfo(successMessageElement);
          closeForm();
          unblockSubmitButton();
          pristine.reset();
        })
        .catch (() => {
          addInfo(errorMessageElement);
          unblockSubmitButton();
        });
    }
  });
}

export {validateComment, validateHashtags, isValidType, setFormSubmit};
