import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ currentPage, pageNumberState, onPageChange = () => {} }) {
  const cn = bem('Pagination');

  const callbacks = {
    onPageChange: number => {
      onPageChange(number);
    },
  };

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {pageNumberState.map(item => {
          return item.state == 'button' ? (
            <li
              key={item.pageNumber}
              className={`${cn('page')} ${currentPage === item.pageNumber ? cn('page-active') : ''}`}
              onClick={() => {
                callbacks.onPageChange(item.pageNumber);
              }}
            >
              <span>{item.pageNumber}</span>
            </li>
          ) : item.state == 'dots' ? (
            <li key={item.pageNumber} className={`${cn('page')} ${cn('page-dots')}`}>
              <span>...</span>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageNumberState: PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.string,
      pageNumber: PropTypes.number,
    }),
  ),
  onPageChange: PropTypes.func,
};

export default memo(Pagination);
