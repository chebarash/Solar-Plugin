import React, { Dispatch, SetStateAction, useState } from "react";
import Lottie from "react-lottie";
import icon from "./lotties/ic_fine_tuning.json";

const Search = ({
  state: [_selected, setSelected],
  menu: [_opened, setOpened],
  number,
  value,
  onChange,
}: {
  value: string;
  state: [boolean, Dispatch<SetStateAction<boolean>>];
  menu: [boolean, Dispatch<SetStateAction<boolean>>];
  number: number;
  onChange: (value: string) => any;
}) => {
  const [stop, setStop] = useState<boolean>(false);
  return (
    <div
      style={{
        display: `flex`,
        gridGap: 8,
        padding: `20px 20px 15px 20px`,
        height: 90,
        zIndex: 9999,
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
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <button
          className="settings"
          onClick={() => {
            setSelected((s) => !s);
            setStop(true);
            setTimeout(() => setStop(false), 1);
          }}
        >
          <p
            style={{
              opacity: number,
              transform: `scale(${!number ? 0 : 1})`,
              marginRight: !number ? -28 : 0,
            }}
          >
            {number}
          </p>
          <Lottie
            options={{
              loop: false,
              autoplay: false,
              animationData: icon,
            }}
            height={20}
            width={20}
            isStopped={stop}
          />
        </button>
      </div>
      <button className="button" onClick={() => setOpened(true)}>
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
