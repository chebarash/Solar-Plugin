import React, { Dispatch, SetStateAction } from "react";

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

const Settings = ({
  categories: [categories, setCategories],
}: {
  categories: [
    Array<{ name: string; selected: boolean; len: number; icon: any }>,
    Dispatch<
      SetStateAction<
        Array<{ name: string; selected: boolean; len: number; icon: any }>
      >
    >
  ];
}) => {
  return (
    <div className="box">
      <div className="head">
        <h2>categories</h2>
        <button
          onClick={() =>
            setCategories((c) =>
              c.map(({ name, ...other }) => ({
                ...other,
                name,
                selected: false,
              }))
            )
          }
        >
          Clear all
        </button>
      </div>
      <div>
        {categories.map(({ name: n, selected, len, icon }) => (
          <button
            key={n}
            className={`category${selected ? ` active` : ``}`}
            onClick={() =>
              setCategories((c) =>
                c.map(({ name, selected, ...other }) => ({
                  ...other,
                  name,
                  selected: name === n ? !selected : selected,
                }))
              )
            }
          >
            <div
              style={{ width: 20, height: 20 }}
              dangerouslySetInnerHTML={{
                __html: require(`../../icons/${toStr(n)}/${toStr(icon)}/${
                  selected ? `Bold` : `Linear`
                }.svg`),
              }}
            ></div>
            <p>{n}</p>
            <div className="hint"></div>
            <p className="len">{len}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Settings;
