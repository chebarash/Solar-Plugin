import React, { useState } from "react";

const Icon = ({
  icon,
  name,
  selected,
  select,
  style,
  position,
}: {
  icon: any;
  name: string;
  selected: boolean;
  select: () => any;
  style?: any;
  position?: (offsetTop: number) => string;
}) => {
  const [offsetTop, setOffsetTop] = useState<number>();
  const [hover, setHover] = useState<boolean>(false);
  const [timeout, setT] = useState<number>(0);
  return (
    <button
      style={style}
      className="icon"
      ref={(el) => (!el ? null : setOffsetTop(el.offsetTop))}
    >
      <div
        className={`container${selected ? ` selected` : ``}${
          hover ? ` hover` : ``
        }`}
        onClick={select}
        onMouseEnter={() => {
          clearTimeout(timeout);
          setT(setTimeout(() => setHover(true), 800));
        }}
        onMouseLeave={() => {
          clearTimeout(timeout);
          setHover(false);
        }}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="11"
            stroke="var(--iconCheck)"
            strokeWidth="2"
            fill="var(--accent)"
          />
          <path
            d="M8.5 12L11 15L16 9"
            stroke="var(--iconCheck)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className={`title ${position(offsetTop)}`}>
          <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
            <path
              d="M9 0C5.5 0 4 8 0 8H18C14 8 12.5 0 9 0Z"
              fill="var(--titleBg)"
            />
          </svg>
          <p>{name}</p>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: icon }}
        ></div>
      </div>
    </button>
  );
};

export default Icon;
