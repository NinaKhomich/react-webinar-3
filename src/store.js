import { generateCode } from './utils';

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
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartList: this.state.cartList.filter(item => item.code !== code),
    });
  }

  addItemToCart(code) {
    const addedItem = this.state.cartList.find(item => item.code === code);
    const newItem = this.state.list.find(item => item.code === code);

    addedItem
      ? this.setState({
          ...this.state,
          cartList: this.state.cartList.map(item => {
            if (item.code === code) {
              return {
                ...item,
                count: item.count + 1,
              }
            }
            return item;
          })
        })
      : this.setState({
          ...this.state,
          cartList: [...this.state.cartList, {...newItem, count: 1}],
        })
  }

  getTotalCost(list) {
    return list.reduce((sum, item) => {
      return sum = sum + item.count * item.price;
    }, 0);
  }
}

export default Store;
