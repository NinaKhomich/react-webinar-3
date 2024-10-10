export default {
  /**
   * Открытие формы по названию
   * @param id
   */
  open: id => {
    return { type: 'form/open', payload: { id } };
  },

  /**
   * Закрытие формы
   * @param id
   */
  close: () => {
    return { type: 'form/close' };
  },
};
