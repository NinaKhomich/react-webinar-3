/**
 * Форматирование разрядов числа
 * @param value {string}
 * @param options {Object}
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.DateTimeFormat(locale, options).format(value);
}
