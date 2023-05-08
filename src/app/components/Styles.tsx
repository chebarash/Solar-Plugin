import React from "react";
import Lottie from "react-lottie";
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
          <Lottie
            options={{
              loop: false,
              autoplay: false,
              animationData: icon,
            }}
            height={20}
            width={20}
            isStopped={style !== name}
          />
        </button>
      ))}
    </div>
  );
};

export default Styles;
