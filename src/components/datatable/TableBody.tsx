import React from 'react';
import { DataHeader } from '../../types/data';

interface TableBodyProps<T> {
  data: T;
  header: DataHeader[];
}

const TableBody = <T extends object>({ data, header }: TableBodyProps<T>) => {
  const onRowClicked = () => {
    console.log('Row is clicked');
  };
  return (
    <tr onClick={onRowClicked}>
      {header.map(({ field, numeric, width }) => (
        <td style={{ textAlign: numeric ? 'right' : 'left', width }}>
          {(data as any)[field]}
        </td>
      ))}
    </tr>
  );
};

export default TableBody;
