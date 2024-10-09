import { memo, useCallback } from 'react';
import ItemComment from '../../components/item-comment';
import CommentForm from '../../components/comment-form';
import Comments from '../../components/comments';
import useTranslate from '../../hooks/use-translate';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import comments from '../../store-redux/comments/actions';
import Controls from '../../components/controls';
import shallowequal from 'shallowequal';
import useSelector from '../../hooks/use-selector';

function ArticleComments() {
  const { t } = useTranslate();
  const dispatch = useDispatch();

  const selectRedux = useSelectorRedux(
    state => ({
      comments: state.comments.list,
      isOpenNewCommentForm: state.comments.isOpenNewCommentForm,
    }),
    shallowequal,
  );

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const callbacks = {
    openCommentReply: useCallback(id => {
      dispatch(comments.open(id));
    }),
    closeCommentReply: useCallback(() => {
      dispatch(comments.close());
    }),
    addNewComment
  };

  const commentsList = treeToList(listToTree(selectRedux.comments), (item, level) => ({
    ...item,
    depth: level,
  }));
  commentsList.shift();

  return (
    <Comments t={t} count={selectRedux.comments.length}>
      {commentsList.map((comment, index) => (
        <div key={index} style={{ marginLeft: `${(comment.depth - 1) * 30}px` }}>
          <ItemComment t={t} comment={comment} onOpenReply={callbacks.openCommentReply} />
          {
            <CommentForm
              t={t}
              onSubmit={callbacks.addNewComment}
              parent={comment.parent}
              exists={select.exists}
              commentText={`${t('commentFormReply.text')} ${comment.author.profile.name}`}
              label={t('commentFormReply.title')}
              isOpen={comment.replyOpen}
              commentLinkLogin={t('commentForm.link')}
              requiredText={t('commentFormReply.textRequire')}
            >
              <Controls
                onClick={callbacks.closeCommentReply}
                btnText={t('comment.cancelBtn')}
                theme={select.exists ? '' : '_theme_unexists'}
              />
            </CommentForm>
          }
        </div>
      ))}
      <CommentForm
        t={t}
        exists={select.exists}
        commentText={t('commentForm.text')}
        label={t('commentForm.title')}
        isOpen={selectRedux.isOpenNewCommentForm}
        commentLinkLogin={t('commentForm.link')}
        requiredText={t('commentForm.textRequire')}
      />
    </Comments>
  );
}

ArticleComments.propTypes = {};

export default memo(ArticleComments);
