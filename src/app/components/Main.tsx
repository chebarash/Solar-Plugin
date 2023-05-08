import React from "react";
import Styles from "./Styles";
import Err from "./Err";

import IconsConsumer from "../hooks/icons";
import Icons from "./Icons";

const Main = ({ menu }: { menu: () => any }) => {
  const { icons, loading, selected, message } = IconsConsumer();
  const len = Object.values(icons).map((v) => Object.keys(v).length);

  return (
    <div className={`main${selected.length ? ` active` : ``}`}>
      <Styles />
      {(len.length && !!len.reduce((a, b) => a + b)) || loading ? (
        <Icons buttons add />
      ) : (
        <Err />
      )}
      <div className="fade">
        <button className="accent" onClick={menu}>
          VIEW SELECTED
        </button>
        <button className="medium" onClick={() => message.import(selected)}>
          Import {selected.length} icons
        </button>
      </div>
    </div>
  );
};

export default Main;
