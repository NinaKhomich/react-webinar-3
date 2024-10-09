// Начальное состояние
export const initialState = {
  list: [],
  isOpenNewCommentForm: false,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, list: [], waiting: true, isOpenNewCommentForm: true };

    case 'comments/load-success':
      return { ...state, list: action.payload.list, waiting: false };

    case 'comments/load-error':
      return { ...state, list: [], waiting: false };

    case 'comment-reply/open':
      return { ...state, list: action.payload.list, isOpenNewCommentForm: false };

    case 'comment-reply/close':
      return { ...state, list: action.payload.list, isOpenNewCommentForm: true };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
