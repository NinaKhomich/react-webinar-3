import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Modal({ isOpen, children }) {
  return <div className={`Modal ${isOpen ? 'Modal-visible' : ''}`}>{children}</div>;
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};

export default React.memo(Modal);
