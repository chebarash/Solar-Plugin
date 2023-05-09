import React from "react";
import IconsConsumer from "../hooks/icons";
import Style from "./Style";

const Styles = () => {
  const { styles } = IconsConsumer();
  return (
    <div className={`styleBox`}>
      {styles.map(({ name, icon }) => (
        <Style name={name} icon={icon} />
      ))}
    </div>
  );
};

export default Styles;
