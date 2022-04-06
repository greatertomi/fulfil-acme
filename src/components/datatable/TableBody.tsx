import React, { useEffect, useState } from 'react';
import { DataHeader } from '../../types/data';

interface TableBodyProps<T> {
  data: T;
  header: DataHeader[];
  isChecked?: boolean;
}

const TableBody = <T extends object>({
  data,
  header,
  isChecked = false,
}: TableBodyProps<T>) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleOnCheckChange = () => setChecked(!checked);

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name="check"
          checked={checked}
          onChange={handleOnCheckChange}
        />
      </td>
      {header.map(({ field, numeric, width, isImage }, index) => (
        <td
          key={`${field}${index}`}
          style={{ textAlign: numeric ? 'right' : 'left', width }}
        >
          {isImage ? (
            <img
              src="https://via.placeholder.com/150/92c952"
              alt="rowdata"
              height={50}
              width={50}
            />
          ) : (
            (data as any)[field]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableBody;
