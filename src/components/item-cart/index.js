import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatPrice } from '../../utils';

function ItemCart({ item, onDeleteItem = () => {} }) {
  const cn = bem('ItemCart');

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      onDeleteItem(item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <span className={cn('price')}>{formatPrice(item.price)} ₽</span>
      <span className={cn('count')}>{item.count} шт</span>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }),
  onDelete: PropTypes.func,
};

export default React.memo(ItemCart);
