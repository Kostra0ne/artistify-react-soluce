import React from "react";
import apiHandler from "../../api/APIHandler";

export default function SearchBar(props) {

  const handleChange = async e => {
    const string = e.target.value; // the search text input's value
    if (string) { // if non empty
      const apiRes = await apiHandler.get(`/search?q=${string}`); // get resquest with query string to search against server side
      props.searchClbk(apiRes.data);

    } else props.searchClbk(undefined); // sends an empty object to reset SearchResults display
  };

  return (
    <div className="search-bar">
      <input
        className={`input ${!props.status ? "is-active" : ""}`}
        name="search-query"
        type="text"
        placeholder="search artists or albums"
        onChange={handleChange}
      />
    </div>
  );
}