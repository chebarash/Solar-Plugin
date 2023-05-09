import React from "react";
import Styles from "./Styles";
import Err from "./Err";

import IconsConsumer from "../hooks/icons";
import Icons from "./Icons";
import Loader from "./Loader";

const Main = ({ menu }: { menu: () => any }) => {
  const { icons, loading, selected, search, message } = IconsConsumer();
  const len = Object.values(icons).map((v) => Object.keys(v).length);

  return (
    <div className="main">
      <Styles />
      {loading && !search.length ? (
        <Loader />
      ) : len.length && !!len.reduce((a, b) => a + b) ? (
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
      ) : (
        <Err />
      )}
    </div>
  );
};

export default Main;
