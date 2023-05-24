import React, { useState } from "react";
import IconsConsumer from "../hooks/icons";

const Disclaimer = () => {
  const [dontShow, setDontShow] = useState<boolean>(false);
  const { hideDisclaimer } = IconsConsumer();
  return (
    <div className="disclaimer">
      <div>
        <div>
          <button className="small">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                fill="var(--fg)"
              />
            </svg>
          </button>
          <h2>Wait a second!</h2>
        </div>
        <span>
          Unfortunately, due to Figma restrictions, importing <b>Linear</b>,{" "}
          <b>Line Duotone</b> and <b>Broken</b> style icons{" "}
          <b>may not work correctly</b>.
          <br />
          <br />
          We strongly recommend that you only use the <b>Outline</b> style to
          import stroke icons. We are already looking for a solution to this
          problem.
        </span>
        <label>
          <button
            className={dontShow ? `checked` : undefined}
            onClick={() => setDontShow((s) => !s)}
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.66667 7L9 1"
                stroke="var(--buttonFg)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p>Don`t show on next launch</p>
        </label>
        <button className="medium" onClick={() => hideDisclaimer(dontShow)}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;
