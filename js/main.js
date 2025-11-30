import {renderPictures} from './render-pictures.js';
import {openForm, imgUploadInput} from './form.js';
import {setFormSubmit} from './validate-form.js';
import {getData} from './api.js';
import {showErrorMessage} from './messages.js';
import {turnFilterOn, filterPictures} from './upload-pictures-filter.js';

getData()
  .then((pictures) => {
    turnFilterOn(pictures);
    renderPictures(filterPictures());
  })
  .catch((err) => {
    showErrorMessage(err.message);
  });

setFormSubmit();

imgUploadInput.addEventListener('change', openForm);
