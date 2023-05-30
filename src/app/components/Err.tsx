import React from "react";
import IconsConsumer from "../hooks/icons";
import searchErr from "../assets/ill_search_err.png";
import reqErr from "../assets/ill_req_err.png";

const Err = ({ button = true }: { button?: boolean }) => {
  const { setSearch, message, error, loading } = IconsConsumer();

  return (
    <div className="searchErr">
      <div className={loading ? `loading` : undefined}>
        <img src={error ? reqErr : searchErr} alt="error" />
      </div>
      <p>{error || `We couldn't find anything...`}</p>
      {button && (
        <button
          className="accent"
          onClick={() => {
            setSearch(``);
            if (error) message.error();
          }}
          style={{ width: `max-content`, padding: `14px 30px` }}
        >
          {error ? `Try again` : `Main page`}
        </button>
      )}
    </div>
  );
};

export default Err;
