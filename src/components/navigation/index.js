import { memo } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="Navigation">
      <NavLink className="Navigation-link" to={'/'}>
        Главная
      </NavLink>
    </nav>
  );
}

export default memo(Navigation);
