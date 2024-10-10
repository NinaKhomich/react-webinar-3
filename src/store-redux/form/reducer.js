// Начальное состояние
const initialState = {
  selectedCommentId: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'form/open':
      return { ...state, selectedCommentId: action.payload.id };
    case 'form/close':
      return { ...state, selectedCommentId: null };
    default:
      return state;
  }
}

export default reducer;
