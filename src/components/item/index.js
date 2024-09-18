import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAddToCart: e => {
      e.stopPropagation();
      props.onAddToCart(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <span className={cn("price")}>{props.item.price} ₽</span>
      { props.isCart ? <span className={cn("count")}>{props.item.count} шт</span> : null }
      <div className={cn("actions")}>
      { props.isCart
        ? <button onClick={callbacks.onDelete}>Удалить</button>
        : <button onClick={callbacks.onAddToCart}>Добавить</button>
      }
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

Item.defaultProps = {
  onDelete: () => {},
  onAddToCart: () => {},
};

export default React.memo(Item);
