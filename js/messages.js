import {isEscapeKey} from './utils.js';
import {ERROR_SHOW_TIME} from './data.js';

const bodyElement = document.querySelector('body');
const dataErrorTemplateFragment = document.querySelector('#data-error').content;
const dataErrorTemplate = dataErrorTemplateFragment.querySelector('.data-error');
const fragment = document.createDocumentFragment();

// закрытие информационных окошек и удаление обработчиков
function onCloseInfo (evt) {
  evt.stopPropagation();
  const target = evt.target;
  const info = document.querySelector('.info');

  if (target.classList.contains('info') ||
    isEscapeKey(evt) ||
    target.classList.contains('success__button') ||
    target.classList.contains('error__button')) {

    info.remove();
    bodyElement.removeEventListener('click', onCloseInfo);
    bodyElement.removeEventListener('keydown', onCloseInfo);
  }
}

// добавление окна с информацией об итоге загрузки изображения
function addInfo (template) {
  const infoNode = template.cloneNode(true);
  bodyElement.append(infoNode);
  bodyElement.addEventListener('click', onCloseInfo);
  bodyElement.addEventListener('keydown', onCloseInfo);
}

// окно предупреждения об ошибке загрузки данных
function showErrorMessage (message) {
  const errorElement = dataErrorTemplate.cloneNode(true);

  errorElement.textContent = message;

  fragment.append(errorElement);
  bodyElement.append(fragment);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_SHOW_TIME);
}

export {addInfo, showErrorMessage};
