import React from "react";
import Styles from "./Styles";
import Err from "./Err";

import IconsConsumer from "../hooks/icons";
import Icons from "./Icons";
import Loader from "./Loader";
import Banner from "./Banner";

const Main = ({ menu }: { menu: () => any }) => {
  const { loading, selected, search, message, error, len, banner, setBanner } =
    IconsConsumer();

  const selectedLength = Object.keys(selected).length;

  return (
    <div className="main">
      {error ? <div></div> : <Styles />}
      {error || (!len && search.length) ? (
        <Err />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          {banner && <Banner hide={() => setBanner(false)} />}
          <Icons />
          <div className={`fade${selectedLength ? ` active` : ``}`}>
            <button className="accent" onClick={menu}>
              VIEW SELECTED
            </button>
            <button className="medium" onClick={() => message.import(selected)}>
              Import {selectedLength} icon
              {selectedLength != 1 && `s`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
