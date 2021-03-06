import React, { FC, useState } from 'react';

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const onInputChange = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      className="form-control"
      style={{ width: '240px' }}
      placeholder="Search"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default Search;
