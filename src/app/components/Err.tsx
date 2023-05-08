import React from "react";
import IconsConsumer from "../hooks/icons";
import searchErr from "../assets/ill_search_err.png";

const Err = () => {
  const { setSearch, message } = IconsConsumer();

  return (
    <div className="searchErr">
      <img src={searchErr} alt="Search error" />
      <p>We couldn't find anything...</p>
      <button
        className="accent"
        onClick={() => {
          setSearch(``);
          message.search(``);
        }}
      >
        Main page
      </button>
    </div>
  );
};

export default Err;
