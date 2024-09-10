/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  randomCode() { // генерация уникального случайного числа
    let randomNumber;
    do {
      randomNumber = Math.floor((Math.random()*(50-1))+1); // рандомное число от 1 до 50;
    } while (this.state.codes.indexOf(randomNumber) != -1) // проверка наличия кода в списке
    return randomNumber;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    let newItemCode = this.randomCode()
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newItemCode, title: 'Новая запись', count: 0 }],
      codes: [...this.state.codes, newItemCode],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          item.selected ? item.count++ : item.count;
        } else item.selected = false;
        return item;
      }),
    });
  }
}

export default Store;
