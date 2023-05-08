import React, { useState } from "react";
import Scrollbar from "./Scrollbar";
import Icon from "./Icon";
import IconsConsumer from "../hooks/icons";
import Loader from "./Loader";
import Banner from "./Banner";

const Icons = ({
  i,
  buttons = false,
  add = false,
}: {
  i?: {
    [category: string]: {
      [name: string]: {
        [style: string]: string;
      };
    };
  };
  buttons?: boolean;
  add?: boolean;
}) => {
  const {
    icons,
    style,
    selected,
    setSelected,
    loading,
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
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            padding: `15px 20px 25px 20px`,
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
              if (i) {
                return Object.entries(val)
                  .filter(([style]) =>
                    selected.includes(`${style} / ${category} / ${name}`)
                  )
                  .map(([style, icon]) => {
                    const str = `${style} / ${category} / ${name}`;
                    return (
                      <Icon
                        key={str}
                        name={name}
                        size={viewSize}
                        selected={true}
                        select={() =>
                          setSelected((s) => s.filter((s) => s !== str))
                        }
                        icon={icon}
                      />
                    );
                  });
              }
              const str = `${style} / ${category} / ${name}`;
              const active = selected.includes(str);
              return (
                <Icon
                  key={`${category}-${name}`}
                  name={name}
                  size={viewSize}
                  selected={active}
                  select={() =>
                    setSelected((s) =>
                      active ? s.filter((s) => s !== str) : [...s, str]
                    )
                  }
                  icon={data[category][name][style]}
                />
              );
            })
          )}
          {next && buttons && (
            <button className="accent" onClick={() => message.next()}>
              next
            </button>
          )}
        </div>
      )}
    </Scrollbar>
  );
};

export default Icons;
