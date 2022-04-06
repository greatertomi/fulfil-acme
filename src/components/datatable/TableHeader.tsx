import React, { FC, useState } from 'react';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { DataHeader } from '../../types/data';

interface TableHeaderProps {
  headers: DataHeader[];
  onSorting: (field: string, order: string) => void;
  onClickCheckbox?: () => void;
  isChecked?: boolean;
}

const TableHeader: FC<TableHeaderProps> = ({
  headers,
  onSorting,
  isChecked,
  onClickCheckbox,
}) => {
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
        <th>
          <input
            type="checkbox"
            name="check"
            checked={isChecked}
            onChange={onClickCheckbox}
          />
        </th>
        {headers.map(({ name, field, sortable, width }) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            style={{ cursor: 'pointer', width }}
          >
            {name}
            {sortingField && sortingField === field && sortable ? (
              sortingOrder === 'asc' ? (
                <BsArrowDownShort />
              ) : (
                <BsArrowUpShort />
              )
            ) : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
