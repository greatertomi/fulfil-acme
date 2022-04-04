import React, { FC, useEffect, useMemo, useState } from 'react';
import { Pagination } from 'react-bootstrap';

interface TablePaginationProps {
  total?: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const TablePagination: FC<TablePaginationProps> = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
      setTotalPages(Math.ceil(total / itemsPerPage));
    }
  }, [itemsPerPage, total]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pages;
  }, [totalPages, currentPage, onPageChange]);

  if (totalPages === 0) return null;

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    </Pagination>
  );
};

export default TablePagination;
