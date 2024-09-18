import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import Controls from '../controls';
import List from '../list';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Cart({ list, totalCost, onDeleteItem = () => {}, onCloseCart = () => {} }) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <Head title={'Корзина'} />
        <Controls isCart={true} onClickBtn={onCloseCart} btnText={'Закрыть'} />
      </div>
      <List isCart={true} list={list} onDeleteItem={onDeleteItem} />
      <div className={cn('result')}>
        <span className={cn('total')}>Итого:</span>
        <span className={cn('cost')}>{totalCost} ₽</span>
      </div>
    </div>
  );
}

Cart.propTypes = {
  list: PropTypes.array,
  totalCost: PropTypes.number,
  onDeleteItem: PropTypes.func,
  onCloseCart: PropTypes.func,
};

export default React.memo(Cart);
