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
import { useParams } from 'react-router-dom';

function ArticleComments() {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const params = useParams();

  const selectRedux = useSelectorRedux(
    state => ({
      comments: state.comments.list,
      selectedCommentId: state.form.selectedCommentId,
    }),
    shallowequal,
  );

  const select = useSelector(state => ({
    currentUser: state.session.user,
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
    }),
  };

  const addComment = (value, parent) => {
    callbacks.addNewComment(value, parent, select.currentUser);
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
            onSubmit={addComment}
            parent={{ _id: item._id, _type: 'comment' }}
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
      {(comments.length == 0 || (comments.length > 0 && !selectRedux.selectedCommentId)) && (
        <CommentForm
          t={t}
          parent={{ _id: params.id, _type: 'article' }}
          onSubmit={addComment}
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

export default memo(ArticleComments);
