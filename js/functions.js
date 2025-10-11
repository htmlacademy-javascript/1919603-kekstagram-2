function checkStringLength (string, maxLengthString) {
  const strLength = string.length;
  return strLength <= maxLengthString;
}

function isItPolindrom (str) {
  const mainStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = mainStr.split('').reverse().join('');

  return mainStr === reversedStr;
}

checkStringLength('kek', 3);
isItPolindrom('kek');
