import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const { onSearch } = props;
  const [term, setTerm] = useState("");

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <div className="SearchBar">
      <input
        onChange={handleTermChange}
        placeholder="Enter A Song, Album, or Artist"
      />
      <button className="SearchButton" onClick={handleSearch}>
        เบิ่ง!
      </button>
    </div>
  );
}

export default SearchBar;
