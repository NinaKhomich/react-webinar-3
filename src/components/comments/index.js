import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comments(props) {
  const { t = text => text, count = 0, children } = props;
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{`${t('comment.comments')} (${count})`}</h2>
      {children}
    </div>
  );
}

Comments.propTypes = {};

export default memo(Comments);
