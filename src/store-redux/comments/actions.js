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
          payload: { list: res.data.result.items },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  addNewComment: (comment, parent, author) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            text: comment,
            parent: { _id: parent._id, _type: parent._type ? parent._type : 'comment' },
          }),
        });
        console.log('111');
        // Комментарий создан успешно
        dispatch({
          type: 'comments/add-success',
          payload: { list: response.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/add-error' });
      }
    };
  },
};
