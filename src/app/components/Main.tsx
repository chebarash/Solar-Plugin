import React from "react";
import Styles from "./Styles";
import Err from "./Err";

import IconsConsumer from "../hooks/icons";
import Icons from "./Icons";
import Loader from "./Loader";

const Main = ({ menu }: { menu: () => any }) => {
  const { loading, selected, search, message, error, len } = IconsConsumer();
  return (
    <div className="main">
      {error ? <div></div> : <Styles />}
      {error || (!len && search.length) ? (
        <Err />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <Icons buttons add />
          <div className={`fade${selected.length ? ` active` : ``}`}>
            <button className="accent" onClick={menu}>
              VIEW SELECTED
            </button>
            <button className="medium" onClick={() => message.import(selected)}>
              Import {selected.length} icon{selected.length > 1 && `s`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
