import React from "react";
import IconsConsumer from "../hooks/icons";

const Styles = () => {
  const { selected, style, styles, setStyle } = IconsConsumer();
  return (
    <div className={`styleBox`}>
      {styles.map(({ name, icon }) => (
        <button
          key={name}
          disabled={style === name}
          className={`style${style === name ? ` active` : ``}${
            selected.some((s) => s.startsWith(`${name} / `)) ? ` selc` : ``
          }`}
          onClick={() => setStyle(name)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {icon}
          </svg>
        </button>
      ))}
    </div>
  );
};

export default Styles;
