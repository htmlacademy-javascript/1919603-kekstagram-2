import {VALIDATE_COMMENT_ERROR, IMAGE_TYPES} from './data.js';
import {sendData} from './api.js';
import {addInfo} from './messages.js';
import {blockSubmitButton, unblockSubmitButton, closeForm} from './form.js';

const formElement = document.querySelector('.img-upload__form');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const textDescriptionInput = formElement.querySelector('.text__description');
const textHashtagsInput = formElement.querySelector('.text__hashtags');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
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
    return { valid: false, error: 'Превышено количество хэштегов (не более 5)' };
  }

  const lowerSet = new Set();

  for (const tag of tags) {
    if (!tag.startsWith('#')) {
      return { valid: false, error: 'Хэштег должен начинаться с символа #' };
    }

    const tagBody = tag.slice(1);

    if (tagBody.length === 0) {
      return { valid: false, error: 'Хэштег не может состоять только из #' };
    }

    if (!/^[\p{L}\p{N}]+$/u.test(tagBody)) {
      return { valid: false, error: 'Введён невалидный хэштег — только буквы и цифры' };
    }

    if (tag.length > 20) {
      return { valid: false, error: 'Хэштег не может быть длиннее 20 символов' };
    }

    const lowerTag = tag.toLowerCase();
    if (lowerSet.has(lowerTag)) {
      return { valid: false, error: 'Хэштеги не должны повторяться' };
    }
    lowerSet.add(lowerTag);
  }

  return { valid: true };
}

pristine.addValidator(
  textHashtagsInput,
  (value) => validateHashtags(value).valid,
  () => validateHashtags(textHashtagsInput.value).error,
  2,
  false
);

function isValidType (file) {
  const fileName = file.name.toLowerCase();
  return IMAGE_TYPES.some((it) => fileName.endsWith(it));
}

// отправка формы и добавление уведомления об итогах отправки
function setFormSubmit () {
  formElement.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    evt.preventDefault();

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

export {validateComment, validateHashtags, isValidType, setFormSubmit, pristine};
