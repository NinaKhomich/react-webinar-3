import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function HeadLogin({
  isLogged,
  userName,
  t = text => text,
  onLogout = () => {},
  setLocation = () => {},
  removeLocation = () => {},
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClickLogout = e => {
    if (isLogged) {
      e.preventDefault();
      onLogout();
      removeLocation();
      location.pathname == '/profile' && navigate('/');
    } else setLocation(location);
  };

  return (
    <div className="HeadLogin">
      {isLogged && (
        <Link to={'/profile'} className="HeadLogin-username">
          {userName}
        </Link>
      )}
      <Link to={'/login'} className="HeadLogin-button" onClick={handleClickLogout}>
        {t(isLogged ? 'button.logout' : 'button.login')}
      </Link>
    </div>
  );
}

HeadLogin.propTypes = {
  userName: PropTypes.node,
  isLogged: PropTypes.bool,
  onLogout: PropTypes.func,
  t: PropTypes.func,
  setLocation: PropTypes.func,
  removeLocation: PropTypes.func,
};

export default memo(HeadLogin);
