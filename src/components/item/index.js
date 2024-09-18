import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ item, isCart, onDelete = () => {}, onAddToCart = () => {} }) {
  const cn = bem('Item');

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      onDelete(item.code);
    },
    onAddToCart: e => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <span className={cn('price')}>{item.price} ₽</span>
      {isCart ? <span className={cn('count')}>{item.count} шт</span> : null}
      <div className={cn('actions')}>
        {isCart ? (
          <button onClick={callbacks.onDelete}>Удалить</button>
        ) : (
          <button onClick={callbacks.onAddToCart}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  isCart: PropTypes.bool,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
