import React, { useState } from "react";
import IconsConsumer from "../hooks/icons";

const Style = ({ name, icon }: { name: string; icon: any }) => {
  const { selected, style, setStyle } = IconsConsumer();
  const [click, setClick] = useState<boolean>(false);
  return (
    <button
      key={name}
      disabled={style === name}
      className={`style${style === name ? ` active` : ``}${
        selected.some((s) => s.startsWith(`${name} / `)) ? ` selc` : ``
      }`}
      onClick={() => {
        setStyle(name);
        setClick(true);
        setTimeout(() => setClick(false), 300);
      }}
    >
      <svg
        className={click && `clicked`}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        {icon}
      </svg>
    </button>
  );
};

export default Style;
