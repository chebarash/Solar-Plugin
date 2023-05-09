import React, { Dispatch, SetStateAction, useState } from "react";
import IconsConsumer from "../hooks/icons";

const Search = ({
  settings,
  menu,
}: {
  settings: Dispatch<SetStateAction<boolean>>;
  menu: () => any;
}) => {
  const { search, setSearch, category, message } = IconsConsumer();
  const [click, setClick] = useState<boolean>(false);
  return (
    <div
      style={{
        display: `flex`,
        gridGap: 8,
        padding: `20px 20px 0 20px`,
        height: 70,
      }}
    >
      <div
        style={{
          position: `relative`,
          display: `flex`,
          alignItems: `center`,
          borderRadius: 10,
          flex: 1,
        }}
      >
        <svg
          style={{ position: `absolute`, left: 15, pointerEvents: `none` }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <circle
            cx="9.66732"
            cy="9.66671"
            r="6.33333"
            stroke="var(--fg)"
            strokeWidth="1.5"
          />
          <path
            d="M14.334 14.3334L16.6673 16.6667"
            stroke="var(--fg)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          className="input"
          placeholder="Search"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            message.search(e.target.value);
          }}
        />
        <button
          className={`settings${category.length ? ` active` : ``}`}
          onClick={() => {
            setClick(true);
            setTimeout(() => setClick(false), 300);
            settings((s) => !s);
            message.category(category);
          }}
        >
          <p>{category.length}</p>
          <svg
            className={click && `clicked`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <rect
              x="1"
              y="5.3"
              width="18"
              height="1.4"
              rx="0.7"
              fill="var(--fg)"
            />
            <rect
              x="1"
              y="13.3"
              width="18"
              height="1.4"
              rx="0.7"
              fill="var(--fg)"
            />
            <circle
              cx="12"
              cy="6"
              r="3"
              fill="var(--fg)"
              stroke="white"
              stroke-width="2"
            />
            <circle
              cx="8"
              cy="14"
              r="3"
              fill="var(--fg)"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
      <button className="small" onClick={menu}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
            fill="var(--fg)"
          />
          <path
            d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
            fill="var(--fg)"
          />
          <path
            d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
            fill="var(--fg)"
          />
        </svg>
      </button>
    </div>
  );
};

export default Search;
