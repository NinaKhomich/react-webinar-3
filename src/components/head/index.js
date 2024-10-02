import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function Head({ title, t, children }) {
  return (
    <div className='Head'>
      <Link to={'/login'} className='Head-button'>{t('button.login')}</Link>
      <div className="Head-wrap">
        <div className="Head-place">
          <h1>{title}</h1>
        </div>
        <div className="Head-place">{children}</div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  t: PropTypes.func,
};

Head.defaultProps = {
  t: text => text,
};

export default memo(Head);
