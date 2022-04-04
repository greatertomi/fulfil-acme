import React, {FC, useState} from 'react';
import {DataHeader} from "../../types/data";
import {BsArrowUpShort, BsArrowDownShort} from "react-icons/bs";

interface TableHeadingProps {
  headers: DataHeader[],
  onSorting: () => void
}

const TableHeading: FC<TableHeadingProps> = ({headers, onSorting}) => {
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc');

  const onSortingChange = (field: any) => {
    const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';
    setSortingField(field);
    setSortingOrder(order);
  }

  return (
    <thead>
      <tr>
        {headers.map(({name, field, sortable}) => (
          <th key={name} onClick={() => (sortable ? onSortingChange(field) : null)}>
            {name}
            {sortingField && sortingField === field && (
              <>
                {sortingOrder === 'asc' ? <BsArrowDownShort /> : <BsArrowUpShort />}
              </>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeading;