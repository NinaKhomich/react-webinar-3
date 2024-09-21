import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, children }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {React.Children.map(children, child => {
            // Клонируем каждый дочерний элемент, добавляя или изменяя его пропсы
            return React.cloneElement(child, { item: item });
          })}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  children: PropTypes.node,
};

export default React.memo(List);
