function checkStringLength (string, maxLengthString) {
  const strLength = string.length;
  return strLength <= maxLengthString;
}

function isItPolindrom (str) {
  const mainStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = mainStr.split('').reverse().join('');

  return mainStr === reversedStr;
}

// Строка короче 4 символов
console.log(checkStringLength('три', 4));
// Строка равна 3 символам
console.log(checkStringLength('три', 3));
// Строка длиннее 2 символов
console.log(checkStringLength('три', 2));

// Строка является палиндромом
console.log(isItPolindrom('топот'));
// Несмотря на разный регистр, тоже палиндром
console.log(isItPolindrom('ТоПот'));
// Это не палиндром
console.log(isItPolindrom('кек кек'));
