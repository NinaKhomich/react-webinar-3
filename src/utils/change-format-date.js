/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */

export default function changeFormatDate(date, locale = 'ru-RU') {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  return dateTimeFormat.format(new Date(date)).split(' г.').join('');
}
