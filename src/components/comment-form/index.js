import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm(props) {
  const {
    parent,
    label,
    commentLinkLogin,
    requiredText,
    children,
    exists = false,
    navigateToLogin = () => {},
    onSubmit = () => {},
    t = text => text,
  } = props;
  const cn = bem('CommentForm');
  const [value, setValue] = useState(props.value);
  const [empty, setEmpty] = useState(false);

  const handleOnSubmit = event => {
    event.preventDefault();
    /\S/.test(value) ? onSubmit(value, parent) : setEmpty(true);
    setValue('');
  };

  const handleOnChange = event => {
    setEmpty(false);
    setValue(event.target.value);
  };

  return (
    <div>
      {exists ? (
        <form onSubmit={handleOnSubmit} className={cn()}>
          <label className={cn('title')}>{label}</label>
          <textarea
            value={value ?? ''}
            onChange={handleOnChange}
            className={cn('textarea')}
            name="text"
            placeholder={t('commentForm.text')}
          />
          {empty && <span className={cn('error')}>{t('required.text')}</span>}
          <div className={cn('buttons')}>
            <button className={cn('btn')}>{t('comment.sendBtn')}</button>
            {children}
          </div>
        </form>
      ) : (
        <div className={cn('message')}>
          <button className={cn('link')} onClick={navigateToLogin}>
            {commentLinkLogin}
          </button>
          <p className={cn('text')}>{`, ${requiredText}.`}</p>
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
  navigateToLogin: PropTypes.func,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
  parent: PropTypes.object,
};

export default memo(CommentForm);
