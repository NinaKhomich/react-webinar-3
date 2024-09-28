import { memo } from 'react';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Product({ item, itemCountry, itemCategory, addToBasket = () => {} }) {
  const cn = bem('Product');
  const callbacks = {
    addToBasket: e => addToBasket(item._id),
  };

  return (
    <div className={cn()}>
      <ul className={cn('features')}>
        <li className={cn('feature')}>{item.description}</li>
        <li className={cn('feature')}>
          Страна производитель: <span className={cn('value')}>{itemCountry}</span>
        </li>
        <li className={cn('feature')}>
          Категория: <span className={cn('value')}>{itemCategory}</span>
        </li>
        <li className={cn('feature')}>
          Год выпуска: <span className={cn('value')}>{item.edition}</span>
        </li>
        <li
          className={`${cn('feature')} ${cn('price')}`}
        >{`Цена: ${numberFormat(item.price)} ₽`}</li>
      </ul>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </div>
  );
}

Product.propTypes = {
  itemCategory: PropTypes.string,
  itemCountry: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  addToBasket: PropTypes.func,
};

export default memo(Product);
