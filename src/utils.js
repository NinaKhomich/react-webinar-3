/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function sortCategoriesList(list) {
  let newCategoriesList = list.filter(category => !category.parent);
  let categoriesChildList = list.filter(category => category.parent);

  while (categoriesChildList.length > 0) {
    let sortedCategoriesList = [];
    categoriesChildList.map(category => (category.title = `- ${category.title}`));
    newCategoriesList.forEach(element => {
      sortedCategoriesList.push(element);
      categoriesChildList.map(category => {
        if (category.parent._id == element._id) {
          sortedCategoriesList.push(category);
        }
      });
      categoriesChildList = categoriesChildList.filter(
        category => element._id != category.parent._id,
      );
    });
    newCategoriesList = sortedCategoriesList;
  }
  return newCategoriesList;
}
