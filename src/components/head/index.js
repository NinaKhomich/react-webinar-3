import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function Head({ title, t, children, isLogged, userName, onLogout }) {
  return (
    <div className='Head'>
      <div className='Head-login-row'>
        {isLogged && <Link to={'/profile'} className='Head-username'>{userName}</Link>}
        <Link to={'/login'} className='Head-button' onClick={onLogout}>{t(isLogged ? 'button.logout' : 'button.login')}</Link>
      </div>
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
  userName: PropTypes.node,
  children: PropTypes.node,
  isLogged: PropTypes.bool,
  onLogout: PropTypes.func,
  t: PropTypes.func,
};

Head.defaultProps = {
  onLogout: () => {},
  t: text => text,
};

export default memo(Head);
