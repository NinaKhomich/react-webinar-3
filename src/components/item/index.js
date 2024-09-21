import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatPrice } from '../../utils';

function Item({ item, onAddToCart = () => {} }) {
  const cn = bem('Item');

  const callbacks = {
    onAddToCart: e => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <span className={cn('price')}>{formatPrice(item.price)} ₽</span>
      <div className={cn('actions')}>
          <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
