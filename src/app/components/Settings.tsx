import React, { useEffect, useState } from "react";
import IconsConsumer from "../hooks/icons";
import Err from "./Err";

const toStr = (text: string) =>
  text.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "");

const Settings = ({ catSearch }: { catSearch: string }) => {
  const { icons, category, setCategory } = IconsConsumer();
  const [c, setC] = useState<Array<string>>();

  useEffect(() => {
    setC(
      Object.keys(icons).sort((a, b) => {
        if (category.includes(a)) return -1;
        if (category.includes(b)) return 1;
        return 0;
      })
    );
  }, []);

  const data =
    c &&
    c.filter((name) =>
      toStr(catSearch).length ? toStr(name).includes(toStr(catSearch)) : true
    );

  return data && data.length ? (
    <div className="box">
      <div className="head">
        <h2>categories</h2>
        <button onClick={() => setCategory([])}>Clear all</button>
      </div>
      <div>
        {data.map((name) => {
          const active = category.includes(name);
          return (
            <button
              key={name}
              className={`category${active ? ` active` : ``}`}
              onClick={() =>
                setCategory((c) =>
                  active ? c.filter((c) => c !== name) : [...c, name]
                )
              }
            >
              <div style={{ width: 20, height: 20 }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  dangerouslySetInnerHTML={{
                    __html: Object.values(icons[name])[0][
                      active ? `Bold` : `Linear`
                    ],
                  }}
                ></svg>
              </div>
              <p>{name}</p>
              <div className="hint"></div>
              <p className="len">{Object.values(icons[name]).length}</p>
            </button>
          );
        })}
      </div>
    </div>
  ) : (
    <Err button={false} />
  );
};

export default Settings;
