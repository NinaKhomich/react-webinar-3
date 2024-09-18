import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ btnText, onClickBtn = () => {} }) {
  return (
    <div className="Controls">
      <button className="Controls-button" onClick={() => onClickBtn()}>
        {btnText}
      </button>
    </div>
  );
}

Controls.propTypes = {
  btnText: PropTypes.string,
  onClickBtn: PropTypes.func,
};

export default React.memo(Controls);
