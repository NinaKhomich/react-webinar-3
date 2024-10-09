import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onClick = () => {}, btnText, theme }) {
  const handleClick = e => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="Controls">
      <button className={`Controls-button Controls-button${theme}`} onClick={handleClick}>
        {btnText}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  btnText: PropTypes.string,
  theme: PropTypes.string,
};

export default memo(Controls);
