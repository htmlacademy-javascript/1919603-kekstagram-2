// Применение эффектов в форме загрузки изображения с помощью библиотеки noUiSlider
import {Effects, StyleFilterByEffects, getEffectSelector} from './slider-options.js';

const formElement = document.querySelector('.img-upload__form');
const sliderInputWrapper = formElement.querySelector('.img-upload__effect-level');
const levelInput = formElement.querySelector('.effect-level__value');
const sliderElement = formElement.querySelector('.effect-level__slider');
const effectRadioButtons = formElement.querySelectorAll('.effects__radio');
const imgPreviewElement = formElement.querySelector('.img-upload__preview').firstElementChild;
const selectorImg = imgPreviewElement.classList;

function getUpdateSliderOptions (effect, slider) {
  return slider.noUiSlider.updateOptions(Effects[effect]);
}

function resetFilter () {
  sliderInputWrapper.classList.add('hidden');

  imgPreviewElement.style.removeProperty('filter');
  imgPreviewElement.className = '';
  imgPreviewElement.classList.add('effects__preview--none');
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

function onEffectRadioButtonClick (evt) {
  const currentRadioButton = evt.target.closest('.effects__radio');

  if (currentRadioButton) {
    const effectButtonValue = currentRadioButton.value;

    imgPreviewElement.classList.replace(selectorImg, getEffectSelector(effectButtonValue));
    getUpdateSliderOptions(effectButtonValue, sliderElement);
  }
}

sliderElement.noUiSlider.on('update', () => {
  levelInput.value = sliderElement.noUiSlider.get();

  effectRadioButtons.forEach((item) => {
    if (item.checked) {
      if (item.value !== 'none') {
        sliderInputWrapper.classList.remove('hidden');

        imgPreviewElement.style.filter = StyleFilterByEffects[item.value](levelInput.value);
      } else {
        resetFilter();
      }
    }
  });
});

export {onEffectRadioButtonClick, resetFilter};
