import { memo, useCallback } from 'react';
import ItemComment from '../../components/item-comment';
import CommentForm from '../../components/comment-form';
import Comments from '../../components/comments';
import useTranslate from '../../hooks/use-translate';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree';
import commentsActions from '../../store-redux/comments/actions';
import formActions from '../../store-redux/form/actions.js';
import Controls from '../../components/controls';
import shallowequal from 'shallowequal';
import useSelector from '../../hooks/use-selector';

function ArticleComments() {
  const { t } = useTranslate();
  const dispatch = useDispatch();

  const selectRedux = useSelectorRedux(
    state => ({
      comments: state.comments.list,
      selectedCommentId: state.form.selectedCommentId,
    }),
    shallowequal,
  );

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const callbacks = {
    openformComment: useCallback(id => {
      dispatch(formActions.open(id));
    }),
    closeformComment: useCallback(() => {
      dispatch(formActions.close());
    }),
    addNewComment: useCallback((value, parent, author) => {
      dispatch(commentsActions.addNewComment(value, parent, author));
    })
  };

  const commentsTree = listToTree(selectRedux.comments);
  let comments = [];
  commentsTree.map(item => {
    item.children ? (comments = item.children) : null;
  });

  const renderCommentsList = list => {
    return list.map(item => (
      <div key={item._id}>
        <ItemComment t={t} comment={item} onOpenReply={callbacks.openformComment} />
        {item.children && item.children.length != 0 ? renderCommentsList(item.children) : null}
        {selectRedux.selectedCommentId === item._id ? (
          <CommentForm
            t={t}
            onSubmit={callbacks.addNewComment}
            author={select.user}
            parent={item.parent}
            exists={select.exists}
            commentText={`${t('commentFormReply.text')} ${item.author.profile.name}`}
            label={t('commentFormReply.title')}
            commentLinkLogin={t('commentForm.link')}
            requiredText={t('commentFormReply.textRequire')}
          >
            <Controls
              onClick={callbacks.closeformComment}
              btnText={t('comment.cancelBtn')}
              theme={select.exists ? '' : '_theme_unexists'}
            />
          </CommentForm>
        ) : null}
      </div>
    ));
  };

  return (
    <Comments t={t} count={selectRedux.comments.length}>
      {renderCommentsList(comments)}

      {!selectRedux.selectedCommentId && (
        <CommentForm
          t={t}
          onSubmit={callbacks.addNewComment}
          exists={select.exists}
          commentText={t('commentForm.text')}
          label={t('commentForm.title')}
          commentLinkLogin={t('commentForm.link')}
          requiredText={t('commentForm.textRequire')}
        />
      )}
    </Comments>
  );
}

ArticleComments.propTypes = {};

export default memo(ArticleComments);
