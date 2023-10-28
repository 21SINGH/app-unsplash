import React, { useState } from 'react';

const SearchBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for photos..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
