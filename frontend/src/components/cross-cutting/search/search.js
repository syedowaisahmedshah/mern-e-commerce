import React, { useState } from "react";

const Search = ({navigate}) => {
  const [keyword, setKeyword] = useState('');

  const search = (e) => {
    e.preventDefault();

    if (keyword) {
        navigate(`/search/${keyword.trim()}`);
    } else {
        navigate('/');
    }

    setKeyword(e.target.value);
  };

  return (
    <form onSubmit={search}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Search Product By Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
