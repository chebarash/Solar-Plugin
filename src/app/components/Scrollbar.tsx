import Scrollbars from "react-custom-scrollbars-2";
import React from "react";

const Scrollbar = ({
  children,
  setScroll,
  r,
}: {
  children: any;
  setScroll?: (val: number) => any;
  r?: (val: any) => any;
}) => {
  return (
    <Scrollbars
      ref={r}
      renderView={({ style, ...props }) => {
        return <div style={style} {...props} />;
      }}
      renderTrackVertical={({ style, ...props }) => (
        <div className="track" {...props} />
      )}
      renderThumbVertical={({ style, ...props }) => (
        <div style={{ ...style }} className="thumb" {...props} />
      )}
      onScroll={
        setScroll
          ? ({ target }) => setScroll((target as HTMLDivElement).scrollTop)
          : undefined
      }
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
