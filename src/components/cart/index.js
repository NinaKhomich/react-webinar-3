import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

function Cart({ list, onDeleteItem, totalCost }) {

  return (
    <div className="Cart">
      <List isCart={true} list={list} onDeleteItem={onDeleteItem}/>
      <span className='Cart-total'>Итого: {totalCost}</span>
    </div>
  );
}

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
};

export default React.memo(Cart);
