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
    // addNewComment
  };

  const commentsList = listToTree(selectRedux.comments);
  console.log(commentsList);

  const renders = {
    item: useCallback(
      item => (
        <ItemComment t={t} comment={item} onOpenReply={callbacks.openCommentReply} />
      ),
      [callbacks.openCommentReply, t],
    ),
  };

  const recurse = (list) => {
    list.map(item => {
      renders.item(item);
      item.children.length != 0 ? recurse(item.children) : null
    })
  }

  return (
    <Comments t={t} count={selectRedux.comments.length}>
      {recurse(commentsList)}

      {/* {commentsList.map((comment, index) => (
        <div key={index} style={{ marginLeft: `${(comment.depth - 1) * 30}px` }}>
          <ItemComment t={t} comment={comment} onOpenReply={callbacks.openCommentReply} />

            {/* { comment.children.length != 0
              ? comment.children.map((item, index) => (
                <div key={index} style={{ marginLeft: `${(comment.depth) * 30}px` }}>
                  <ItemComment t={t} comment={item} onOpenReply={callbacks.openCommentReply} />
                  <CommentForm
                    t={t}
                    onSubmit={callbacks.addNewComment}
                    parent={item.parent}
                    exists={select.exists}
                    commentText={`${t('commentFormReply.text')} ${item.author.profile.name}`}
                    label={t('commentFormReply.title')}
                    isOpen={item.replyOpen}
                    commentLinkLogin={t('commentForm.link')}
                    requiredText={t('commentFormReply.textRequire')}
                  >
                    <Controls
                      onClick={callbacks.closeCommentReply}
                      btnText={t('comment.cancelBtn')}
                      theme={select.exists ? '' : '_theme_unexists'}
                    />
                  </CommentForm>
                </div>))
              : null
              } */}
          {/* <div  style={{ marginLeft: comment.children.length != 0 && `${(comment.depth) * 30}px` }}>
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
          </div>
        </div>
      ))} */}
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
