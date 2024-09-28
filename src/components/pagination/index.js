import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ currentPage, totalPages, onPageChange = () => {} }) {
  const cn = bem('Pagination');

  const getPaginationArray = (totalPages, currentPage) => {
    const firstPage = 1;
    const leftPagesToShow = firstPage + 2;
    const rightPagesToShow = totalPages - 2;
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    if (totalPages < 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage < 3) {
        return [firstPage, firstPage + 1, leftPagesToShow, 'dots', totalPages];
      }

      if (currentPage == 3) {
        return [firstPage, prevPage, currentPage, nextPage, 'dots', totalPages];
      }

      if (currentPage > 3 && currentPage < rightPagesToShow) {
        return [firstPage, 'dots', prevPage, currentPage, nextPage, 'dots', totalPages];
      }

      if (currentPage == rightPagesToShow) {
        return [firstPage, 'dots', prevPage, currentPage, nextPage, totalPages];
      }

      if (currentPage > rightPagesToShow) {
        return [firstPage, 'dots', rightPagesToShow, totalPages - 1, totalPages];
      }
    }
  };

  const paginationArray = getPaginationArray(totalPages, currentPage);

  const callbacks = {
    onPageChange: number => {
      onPageChange(number);
    },
  };

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {paginationArray.map((item, index) => {
          return item == 'dots' ? (
            <li key={index} className={`${cn('page')} ${cn('page-dots')}`}>
              <span>...</span>
            </li>
          ) : (
            <li
              key={index}
              className={`${cn('page')} ${currentPage === item ? cn('page-active') : ''}`}
              onClick={() => {
                callbacks.onPageChange(item);
              }}
            >
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default memo(Pagination);
