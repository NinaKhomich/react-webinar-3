import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentForm(props) {
  const {
    parent,
    commentText,
    label,
    commentLinkLogin,
    requiredText,
    children,
    exists = false,
    isOpen = false,
    onSubmit = () => {},
    t = text => text,
  } = props;
  const cn = bem('CommentForm');
  const [value, setValue] = useState(props.value);

  const handleOnSubmit = event => {
    event.preventDefault();
    onSubmit(value, parent);
  }

  const handleOnChange = event => {
    setValue(event.target.value);
  };

  return (
    <div>
      {exists ? (
        <form onSubmit={handleOnSubmit} className={`${cn()} ${isOpen ? cn({ theme: 'open' }) : ''}`}>
          <label className={cn('title')}>{label}</label>
          <textarea onChange={handleOnChange} className={cn('textarea')} name="text" placeholder={commentText} />
          <div className={cn('buttons')}>
            <button className={cn('btn')}>{t('comment.sendBtn')}</button>
            {children}
          </div>
        </form>
      ) : (
        <div className={`${isOpen ? cn('message', { theme: 'open' }) : cn('message')}`}>
          <p className={cn('text')}>
            <Link className={cn('link')} to="/login">
              {commentLinkLogin}
            </Link>
            {`, ${requiredText}.`}
          </p>
          {children}
        </div>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  commentText: PropTypes.string,
  label: PropTypes.string,
  commentLinkLogin: PropTypes.string,
  requiredText: PropTypes.string,
  children: PropTypes.node,
  exists: PropTypes.bool,
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

export default memo(CommentForm);
