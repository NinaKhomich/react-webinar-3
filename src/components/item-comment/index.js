import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import changeFormatDate from '../../utils/change-format-date';

function ItemComment(props) {
  const { comment, owner, t = text => text, onOpenReply = () => {} } = props;
  const cn = bem('ItemComment');

  const handleOpenReply = e => {
    e.preventDefault;
    onOpenReply(comment._id);
  };
  const date = changeFormatDate(comment.dateCreate, t('locale'));

  return (
    <div className={cn()}>
      <div className={cn('wrap')}>
        <div className={cn('head')}>
          <h3 className={cn('author', owner == comment.author.profile.name && { theme: 'owner' })}>
            {comment.author.profile.name}
          </h3>
          <span className={cn('date')}>{date}</span>
        </div>
        <p className={cn('text')}>{comment.text}</p>
        <button className={cn('reply-btn')} onClick={handleOpenReply}>
          {t('comment.replyBtn')}
        </button>
      </div>
    </div>
  );
}

ItemComment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    owner: PropTypes.string,
  }),
  currentUser: PropTypes.object,
  t: PropTypes.func,
  onOpenReply: PropTypes.func,
};

export default memo(ItemComment);
