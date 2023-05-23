import React, { useState } from "react";
import Scrollbar from "./Scrollbar";
import Icon from "./Icon";
import IconsConsumer, { IconsType } from "../hooks/icons";
import Banner from "./Banner";

const Icons = ({
  i,
  buttons = false,
  add = false,
}: {
  i?: IconsType;
  buttons?: boolean;
  add?: boolean;
}) => {
  const {
    icons,
    style,
    selected,
    toggleSelected,
    banner,
    setBanner,
    prev,
    next,
    message,
  } = IconsConsumer();
  const data = i || icons;
  const [viewSize, setSize] = useState<{
    height: number;
    width: number;
    scroll: number;
  }>({
    height: null,
    width: null,
    scroll: 0,
  });
  return (
    <Scrollbar
      setScroll={(scroll: number) => setSize((e) => ({ ...e, scroll }))}
      r={(el) => {
        if (!el || viewSize.height) return;
        const { getClientWidth, getClientHeight } = el;
        setSize((s) => ({
          ...s,
          height: getClientHeight(),
          width: getClientWidth(),
        }));
      }}
    >
      <div
        style={{
          padding: `15px 20px 20px 20px`,
          display: `grid`,
          gridGap: 8,
          gridTemplateColumns: `repeat(auto-fill, minmax(min(62px, 100%), 1fr))`,
        }}
      >
        {banner && add && <Banner hide={() => setBanner(false)} />}
        {prev && buttons && (
          <button className="accent" onClick={() => message.prev()}>
            prev
          </button>
        )}
        {Object.keys(data).map((category) =>
          Object.entries(data[category]).map(([name, val]) => {
            const ico = (icon: string, style: string) => {
              const str = `${style} / ${category} / ${name}`;
              const active = !!selected[str];
              return (
                <Icon
                  key={str}
                  name={name}
                  size={viewSize}
                  selected={active}
                  select={toggleSelected(style, category, name)}
                  icon={icon}
                />
              );
            };
            if (i)
              return Object.entries(val).map(([style, icon]) =>
                ico(icon, style)
              );
            return ico(data[category][name][style], style);
          })
        )}
        {next && buttons && (
          <button className="accent" onClick={() => message.next()}>
            next
          </button>
        )}
      </div>
    </Scrollbar>
  );
};

export default Icons;
