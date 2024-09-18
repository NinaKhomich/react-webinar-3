import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ isCart, list, onDeleteItem, onAddItemToCart }) {

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item isCart={isCart} item={item} onDelete={onDeleteItem} onAddToCart={onAddItemToCart} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  isCart: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onAddItemToCart: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onAddItemToCart: () => {},
};

export default React.memo(List);
