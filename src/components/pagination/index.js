import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ itemsPerPage, totalItems, onPageChange = () => {} }) {
  const cn = bem('Pagination');
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  const callbacks = {
    onPageChange: number => {
      onPageChange(number);
      setCurrentPage(number);
    },
  };

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {pageNumbers.map(number => (
          <li key={number}>
            <span
              className={`${cn('page')} ${currentPage === number ? cn('page-isCurrent') : ''} ${
                number != 1 &&
                number != pageNumbers.length &&
                number != nextPage &&
                number != prevPage &&
                ((currentPage <= 3 && number > 3) ||
                  (currentPage > 3 && currentPage < 53 && currentPage != number) ||
                  (currentPage >= 53 && number < 53))
                  ? cn('page-isHidden')
                  : ''
              }`}
              onClick={() => {
                callbacks.onPageChange(number);
              }}
            >
              {number > 3 && number > nextPage + 1 ? <span className={cn('dots')}>... </span> : ''}
              {number}
              {number < 53 && number < prevPage - 1 ? <span className={cn('dots')}> ... </span> : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  paginate: PropTypes.func,
};

export default memo(Pagination);
