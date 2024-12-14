import React, { useState } from "react";

const Search = () => {
  const [text, setText] = useState("");

  const changeHandler = () => {};

  return (
    <>
      <input
        type="text"
        value={text}
        placeholder="search by recipe name . . ."
        className="form-control"
        onChange={changeHandler}
      />
    </>
  );
};

export default Search;
