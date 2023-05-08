import React from "react";
import IconsConsumer from "../hooks/icons";
import Icons from "./Icons";

const Selected = ({ close }: { close: () => any }) => {
  const { icons, selected } = IconsConsumer();
  const i: {
    [category: string]: {
      [name: string]: {
        [style: string]: string;
      };
    };
  } = {};
  selected.forEach((n) => {
    const [style, category, name]: Array<string> = n.split(` / `);
    if (!i[category]) i[category] = {};
    if (!i[category][name]) i[category][name] = {};
    i[category][name][style] = icons[category][name][style];
  });
  return (
    <div
      className="menu"
      ref={() => {
        if (!selected.length) close();
      }}
    >
      <div className="header">
        <button className="small" onClick={close}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.5303 8.46967C11.2374 8.17678 10.7626 8.17678 10.4697 8.46967L7.46967 11.4697C7.17678 11.7626 7.17678 12.2374 7.46967 12.5303L10.4697 15.5303C10.7626 15.8232 11.2374 15.8232 11.5303 15.5303C11.8232 15.2374 11.8232 14.7626 11.5303 14.4697L9.81066 12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H9.81066L11.5303 9.53033C11.8232 9.23744 11.8232 8.76256 11.5303 8.46967Z"
              fill="var(--fg)"
            />
          </svg>
        </button>
        <h2>{selected.length} Selected icons</h2>
      </div>
      <Icons i={i} />
    </div>
  );
};

export default Selected;
