//основные данные для работы сайта
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_STEP = 25;

const VALIDATE_COMMENT_LENGTH = 140;
const NUMBER_OF_COMMENTS = 5;
const HASHTAGS_LENGTH = 20;
const NUMBERS_OF_HASHTAGS = 5;

const MAIN_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const STATUS_SUCCESS = 200;

const Route = {
  GET_ROUTE: '/data',
  SEND_ROUTE: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = {
  GET_ERROR: 'Ошибка загрузки данных. Попробуйте обновить страницу или зайти позже.',
  SEND_ERROR: 'Ошибка отправки формы. Попробуйте отправить форму ещё раз или воспользуйтесь ею позже.',
};

const ERROR_SHOW_TIME = 5000;

const PICTURES_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

export {
  HASHTAGS_LENGTH,
  NUMBERS_OF_HASHTAGS,
  NUMBER_OF_COMMENTS,
  VALIDATE_COMMENT_LENGTH,
  SCALE_MAX,
  SCALE_MIN,
  SCALE_STEP,
  MAIN_URL,
  STATUS_SUCCESS,
  Route,
  Method,
  ErrorMessage,
  ERROR_SHOW_TIME,
  PICTURES_COUNT,
  Filter,
  IMAGE_TYPES
};
