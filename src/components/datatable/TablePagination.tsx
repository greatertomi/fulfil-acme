import classNames from 'classnames';
import React, { FC } from 'react';
import { usePagination } from '../../hooks/usePagination';
import { PaginationContainer } from './PaginationStyle';

interface NewTablePaginationProps {
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number | string) => void;
}

const TablePagination: FC<NewTablePaginationProps> = ({
  onPageChange,
  pageSize,
  currentPage,
  siblingCount = 1,
  totalCount,
}) => {
  const paginationRange =
    usePagination({
      totalCount,
      pageSize,
      siblingCount,
      currentPage,
    }) || [];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <PaginationContainer>
      <li
        className={classNames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === 'DOTS') {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        return (
          <li
            className={classNames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classNames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </PaginationContainer>
  );
};

export default TablePagination;
