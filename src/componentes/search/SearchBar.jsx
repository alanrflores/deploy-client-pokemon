import React, { useState } from "react";
import { connect } from "react-redux";
import { getPokemonValue } from "../../redux/actions";

const SearchBar = ({ getPokemonValue, setPage }) => {
  const [value, setValue] = useState("");

  const handleInputSearch = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return alert("no existe");
    if (value) {
      getPokemonValue(value);
    }
    setPage(1);
    setValue("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="search..."
        value={value || ""}
        onKeyPress={handleEnter}
        onChange={(e) => handleInputSearch(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </>
  );
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getPokemonValue: (value) => dispatch(getPokemonValue(value)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
