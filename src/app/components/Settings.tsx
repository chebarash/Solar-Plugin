import React from "react";
import IconsConsumer from "../hooks/icons";

const Settings = () => {
  const { categories, category, setCategory } = IconsConsumer();
  return (
    <div className="box">
      <h2>categories</h2>
      <div>
        {categories
          .sort((a, b) => {
            if (category.includes(a.name)) {
              return -1;
            }
            if (category.includes(b.name)) {
              return 1;
            }
            return 0;
          })
          .map(({ name, icon, length }) => {
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
  );
};

export default Settings;
