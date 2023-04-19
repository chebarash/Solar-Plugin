import React, { Dispatch, SetStateAction, useState } from "react";

const pageLen = 150;

const toStr = (text: string) =>
  text
    .replace(/[-_]+/g, "")
    .replace(/[^\w\s]/g, "")
    .replace(
      /\s+(.)(\w*)/g,
      (_$1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(/\w/, (s) => s.toUpperCase())
    .replace(/ /g, "")
    .replace(/4K/g, `FourK`);

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
  size: { height: number; width: number };
}) => {
  const [position, setPos] = useState<{
    offsetHeight: number;
    offsetWidth: number;
    offsetTop: number;
    offsetLeft: number;
  }>();
  const align =
    position?.offsetWidth > position?.offsetLeft
      ? `left`
      : size?.width - position?.offsetWidth * 2 < position?.offsetLeft
      ? `right`
      : `centre`;
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
      <div
        className={`title ${align} ${
          position?.offsetTop < position?.offsetTop ? `top` : `bottom`
        }`}
      >
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
          <path d="M9 0C5.5 0 4 8 0 8H18C14 8 12.5 0 9 0Z" fill="#101833" />
        </svg>
        <p>{name}</p>
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: icon }}></div>
      </div>
    </button>
  );
};

const Main = ({
  list: [list, setList],
  styles,
  size,
}: {
  list: [
    {
      [category: string]: {
        [name: string]: Array<string>;
      };
    },
    Dispatch<
      SetStateAction<{
        [category: string]: {
          [name: string]: Array<string>;
        };
      }>
    >
  ];
  styles: { name: string; icon: any; selected: boolean };
  size: { height: number; width: number };
}) => {
  const [page, setPage] = useState<number>(0);
  return (
    <div className="main">
      {!!page && (
        <button
          onClick={() => setPage((i) => --i)}
          style={{
            gridColumn: `1 / -1`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          prev
        </button>
      )}
      {Object.keys(list)
        .map((category) =>
          Object.keys(list[category]).map((name) => (
            <Icon
              key={`${category}-${name}`}
              name={name}
              size={size}
              selected={list[category][name].includes(styles.name)}
              select={() =>
                setList((i) => {
                  const d = { ...i };
                  if (d[category][name].includes(styles.name))
                    d[category][name] = d[category][name].filter(
                      (e) => e != styles.name
                    );
                  else d[category][name].push(styles.name);
                  return d;
                })
              }
              icon={require(`../../icons/${toStr(category)}/${toStr(
                name
              )}/${toStr(styles.name)}.svg`)}
            />
          ))
        )
        .flat()
        .slice(page * pageLen, page * pageLen + pageLen)}
      {Object.values(list)
        .map((c) => Object.keys(c))
        .flat().length >
        page * pageLen + pageLen && (
        <button
          onClick={() => setPage((i) => ++i)}
          style={{
            gridColumn: `1 / -1`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          next
        </button>
      )}
    </div>
  );
};

export default Main;
