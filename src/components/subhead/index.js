import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../controls';
import { plural } from '../../utils';
import './style.css';

function Subhead({ cartList, totalCost, onOpenCart = () => {} }) {
  return (
    <div className="Subhead">
      {cartList.length ? (
        <>
          <span>В корзине:</span>
          <span className="Subhead-info">
            {`${cartList.length} ${plural(cartList.length, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })}`}{' '}
            / {totalCost} ₽
          </span>
        </>
      ) : (
        <>
          <span>В корзине:</span>
          <span className="Subhead-info">пусто</span>
        </>
      )}
      <Controls onClickBtn={onOpenCart} btnText={'Перейти'} />
    </div>
  );
}

Subhead.propTypes = {
  cartList: PropTypes.array,
  totalCost: PropTypes.number,
  onOpenCart: PropTypes.func,
};

export default React.memo(Subhead);
