// Начальное состояние
export const initialState = {
  list: [],
  comment: {},
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'new-comment/create':
      return { ...state, list: [], waiting: true, isOpenNewCommentForm: true };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
