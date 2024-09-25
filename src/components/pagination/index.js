import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ itemsPerPage, totalItems, onPageChange = () => {} }) {
  const cn = bem('Pagination');
  const pages = [];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const callbacks = {
    onPageChange: number => {
      onPageChange(number);
      setCurrentPage(number);
    },
  };

  const paginationArea = () => {
    for (let pageNumber = 1; pageNumber <= totalPage; pageNumber++) {
      if (
        pageNumber == 1 ||
        pageNumber == totalPage ||
        (pageNumber <= currentPage + 1 && pageNumber >= currentPage - 1) ||
        (currentPage <= 3 && pageNumber <= 3) ||
        (currentPage >= 53 && pageNumber >= 53)
      ) {
        pages.push(
          <li
            key={pageNumber}
            className={`${cn('page')} ${currentPage === pageNumber ? cn('page-active') : ''}`}
            onClick={() => {
              callbacks.onPageChange(pageNumber);
            }}
          >
            <span>{pageNumber}</span>
          </li>,
        );
      } else {
        if (
          (currentPage == 1 && pageNumber == currentPage + 3) ||
          (currentPage != 1 && pageNumber == currentPage + 2) ||
          (currentPage == totalPage && pageNumber == currentPage - 3) ||
          (currentPage != totalPage && pageNumber == currentPage - 2)
        ) {
          pages.push(
            <li key={pageNumber} className={`${cn('page')} ${cn('page-dots')}`}>
              <span>...</span>
            </li>,
          );
        }
      }
    }
    return pages;
  };

  return (
    <div className={cn()}>
      <ul className={cn('list')}>{paginationArea()}</ul>
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  paginate: PropTypes.func,
};

export default memo(Pagination);
