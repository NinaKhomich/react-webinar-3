import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function ItemLink({item, getProduct}) {

  const callbacks = {
    getProduct: e => getProduct(item._id),
  };

  return (
      <Link className='ItemLink' to={'/productPage'} onClick={callbacks.getProduct}>{item.title}</Link>
  );
}

ItemLink.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  }).isRequired,
};

export default memo(ItemLink);
