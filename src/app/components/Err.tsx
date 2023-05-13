import React from "react";
import IconsConsumer from "../hooks/icons";
import searchErr from "../assets/ill_search_err.png";
import reqErr from "../assets/ill_req_err.png";

const Err = () => {
  const { setSearch, message, error, loading } = IconsConsumer();

  return (
    <div className="searchErr">
      <div className={loading ? `loading` : undefined}>
        <img src={error ? reqErr : searchErr} alt="error" />
      </div>
      <p>{error || `We couldn't find anything...`}</p>
      <button
        className="accent"
        onClick={() => {
          setSearch(``);
          message.search(``);
          if (error) message.error();
        }}
        style={{ width: `max-content`, padding: `14px 30px` }}
      >
        {error ? `Try again` : `Main page`}
      </button>
    </div>
  );
};

export default Err;
