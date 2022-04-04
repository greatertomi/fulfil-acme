import React, { FC, useState } from 'react';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { DataHeader } from '../../types/data';

interface TableHeaderProps {
  headers: DataHeader[];
  onSorting: (field: string, order: string) => void;
}

const TableHeader: FC<TableHeaderProps> = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc');

  const onSortingChange = (field: any) => {
    const order =
      field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            style={{ cursor: 'pointer' }}
          >
            {name}
            {sortingField &&
            sortingField === field &&
            sortingOrder === 'asc' ? (
              <BsArrowDownShort />
            ) : (
              <BsArrowUpShort />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
