function stringLength (string, num) {
  const strLength = string.length;
  return strLength <= num;
}

function isItPolindrom (str) {
  const mainStr = str.replaceAll().toLowerCase();
  let i = 0;
  let newStr = '';
  while (i < mainStr.length) {
    newStr = `${mainStr[i]}${newStr}`;
    i = i + 1;
  }
  console.log(newStr);
  return mainStr === newStr;
}

// Строка короче 4 символов
console.log(stringLength('три', 4));
// Строка равна 3 символам
console.log(stringLength('три', 3));
// Строка длиннее 2 символов
console.log(stringLength('три', 2));

// Строка является палиндромом
console.log(isItPolindrom('топот'));
// Несмотря на разный регистр, тоже палиндром
console.log(isItPolindrom('ТоПот'));
// Это не палиндром
console.log(isItPolindrom('кекс'));
