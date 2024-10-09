export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: 'comments/load-success',
          payload: { list: res.data.result.items, isOpenNewCommentForm: true },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  open: selectId => {
    return (dispatch, getState, services) => {
      let list = [];
      getState().comments.list.map(item => {
        item.replyOpen = item._id === selectId ? true : false;
        list = [...list, item];
        dispatch({ type: 'comment-reply/open', payload: { list: list } });
      });
    };
  },

  close: () => {
    return (dispatch, getState, services) => {
      const list = getState().comments.list;
      list.map(item => {
        item.replyOpen = false;
        return item;
      });
      dispatch({ type: 'comment-reply/close', payload: { list: list } });
    };
  },
};
