import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import dateFormat from '../../utils/date-format';

function ItemComment(props) {
  const { comment, t = text => text, onOpenReply = () => {} } = props;
  const cn = bem('ItemComment');

  // const createDate = date => {
  //   dateFormat(date);
  // };

  const handleOpenReply = e => {
    e.preventDefault;
    onOpenReply(comment._id);
  };
  // // new Date(jsonDate).toUTCString()
  // const newDate = new Date('2024-10-08T19:33:32.065Z');
  // // year: 'numeric', month: 'long', day: 'numeric'
  // console.log(newDate.getHours());
  return (
    <div className={cn()}>
      <div className={cn('wrap')}>
        <div className={cn('head')}>
          <h3 className={cn('author')}>{comment.author.profile.name}</h3>
          <span className={cn('date')}>{comment.date}</span>
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
    author: PropTypes.object,
  }),
  t: PropTypes.func,
  onOpenReply: PropTypes.func,
};

export default memo(ItemComment);
