import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function HeadLogin({ t, isLogged, userName, onLogout = () => {} }) {

  const handleClickLogout = () => {
    if (isLogged) onLogout();
  }

  return (
    <div className='HeadLogin'>
        {isLogged && <Link to={'/profile'} className='HeadLogin-username'>{userName}</Link>}
        <Link to={'/login'} className='HeadLogin-button' onClick={handleClickLogout}>{t(isLogged ? 'button.logout' : 'button.login')}</Link>
    </div>
  );
}

HeadLogin.propTypes = {
  userName: PropTypes.node,
  isLogged: PropTypes.bool,
  onLogout: PropTypes.func,
  t: PropTypes.func,
};

HeadLogin.defaultProps = {
  t: text => text,
};

export default memo(HeadLogin);
