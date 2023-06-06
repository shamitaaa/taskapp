import { useState } from "react";

const Search = ({ onSearch, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleCancel= () => {
    onCancel();
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSearch}>Search</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Search;
