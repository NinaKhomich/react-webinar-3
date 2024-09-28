import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import BasketTool from '../basket-tool';
import Navigation from '../navigation';

function MainMenu({ onOpen, amount, sum }) {
  return (
    <div className="MainMenu">
      <Navigation />
      <BasketTool onOpen={onOpen} amount={amount} sum={sum} />
    </div>
  );
}

MainMenu.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(MainMenu);
