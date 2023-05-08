import React, { useState } from "react";

const Icon = ({
  icon,
  name,
  selected,
  select,
  size,
}: {
  icon: any;
  name: string;
  selected: boolean;
  select: () => any;
  size: { height: number; width: number; scroll: number };
}) => {
  const [position, setPos] = useState<{
    offsetHeight: number;
    offsetWidth: number;
    offsetTop: number;
    offsetLeft: number;
  }>();
  const align = [
    position?.offsetWidth > position?.offsetLeft
      ? `left`
      : size.width - position?.offsetWidth * 2 < position?.offsetLeft
      ? `right`
      : `centre`,
    size.scroll + size.height - (position?.offsetTop - 15) >
    position?.offsetWidth * 3
      ? `bottom`
      : `top`,
  ];
  const [hover, setHover] = useState<boolean>(false);
  const [timeout, setT] = useState<number>(0);
  return (
    <button
      ref={(el) => (!el || position ? null : setPos(el))}
      className={`icon${selected ? ` selected` : ``}${hover ? ` hover` : ``}`}
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
      <svg className="tick" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
        <path
          className="check"
          d="M8.5 12L11 15L16 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="cross"
          d="M9 15L15 9M15 15L9 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={`title ${align.join(` `)}`}>
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
          <path d="M9 0C5.5 0 4 8 0 8H18C14 8 12.5 0 9 0Z" fill="#101833" />
        </svg>
        <p>{name}</p>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: icon }}></div>
    </button>
  );
};

export default Icon;
