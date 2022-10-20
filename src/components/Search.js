import React, { useState } from "react";

const Search = (props) => {
  const [field, setField] = useState("");
  const changeFieldHandler = (e) => {
    setField(e.target.value);
    props.handler(e.target.value);
  };

  return (
    <div className="min-w-full flex justify-center">
      <input
        type="email"
        className="w-full max-w-[400px] py-2 px-4 rounded-lg ring-1 ring-gray-300 focus:ring-gray-900 focus:ring-2 focus:outline-none"
        placeholder="Поиск"
        value={field}
        onChange={changeFieldHandler}
      ></input>
    </div>
  );
};

export default Search;
