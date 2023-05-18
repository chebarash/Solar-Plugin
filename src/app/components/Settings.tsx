import React, { useEffect, useState } from "react";
import IconsConsumer, { CategoriesType } from "../hooks/icons";
import Scrollbar from "./Scrollbar";
import Err from "./Err";

const toStr = (text: string) =>
  text.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "");

const Settings = ({ catSearch }: { catSearch: string }) => {
  const { categories, category, setCategory } = IconsConsumer();
  const [c, setC] = useState<CategoriesType>();

  useEffect(() => {
    setC(
      categories.sort((a, b) => {
        if (category.includes(a.name)) return -1;
        if (category.includes(b.name)) return 1;
        return 0;
      })
    );
  }, []);

  const data =
    c &&
    c.filter(({ name }) =>
      toStr(catSearch).length ? toStr(name).includes(toStr(catSearch)) : true
    );

  return data && data.length ? (
    <Scrollbar>
      <div className="box">
        <div className="head">
          <h2>categories</h2>
          <button onClick={() => setCategory([])}>Clear all</button>
        </div>
        <div>
          {data.map(({ name, icon, length }) => {
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
                <div
                  style={{ width: 20, height: 20 }}
                  dangerouslySetInnerHTML={{
                    __html: icon[active ? `Bold` : `Linear`],
                  }}
                ></div>
                <p>{name}</p>
                <div className="hint"></div>
                <p className="len">{length}</p>
              </button>
            );
          })}
        </div>
      </div>
    </Scrollbar>
  ) : (
    <Err button={false} />
  );
};

export default Settings;
