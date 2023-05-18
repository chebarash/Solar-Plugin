import React, { useEffect, useState } from "react";
import IconsConsumer from "../hooks/icons";
import Style from "./Style";

const Styles = () => {
  const { styles, loading } = IconsConsumer();
  const [l, setL] = useState<boolean>(true);
  useEffect(() => {
    if (!loading) setL(false);
  }, [loading]);
  return (
    <div className={`styleBox`}>
      {styles.map(({ name, icon }) =>
        l ? (
          <button key={name} className="styleSkeleton" disabled>
            <div></div>
          </button>
        ) : (
          <Style name={name} icon={icon} key={name} />
        )
      )}
    </div>
  );
};

export default Styles;
