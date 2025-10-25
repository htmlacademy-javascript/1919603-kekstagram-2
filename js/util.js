// функция проверки на длинну строки
function checkStringLength (string, maxLengthString) {
  const strLength = string.length;
  return strLength <= maxLengthString;
}

// функция проверки на полиндром
function isItPolindrom (str) {
  const mainStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = mainStr.split('').reverse().join('');

  return mainStr === reversedStr;
}

// функция рандомного числа
function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// функция рандомного неповторяющегося числа в заданном диапазоне
function createRandomNonRepeatingNumber (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

checkStringLength('kek', 3);
isItPolindrom('kek');

export {getRandomInteger, createRandomNonRepeatingNumber};
