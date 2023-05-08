import React, { useState } from "react";
import developer from "../assets/developer.jpg";
import designer from "../assets/designer.jpg";

const De = ({
  url,
  name,
  title,
  image,
}: {
  url: string;
  name: string;
  title: string;
  image: string;
}) => (
  <a href={url} target="_blank" rel="noreferrer" className="de">
    <div>
      <img src={image} alt={name} />
      <div>
        <h4>{name}</h4>
        <p>{title}</p>
      </div>
    </div>
    <div>
      <p>Contact</p>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 6L15 12L9 18"
          stroke="var(--fg)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </a>
);

const Menu = ({ close }: { close: () => any }) => {
  const [bug, setBug] = useState<string>(``);
  const [submitted, setSubmitted] = useState<boolean>(false);
  return (
    <div className="menu">
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
        <h2>Main menu</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          setBug(``);
          parent.postMessage(
            {
              pluginMessage: { type: `report`, value: bug },
            },
            "*"
          );
        }}
        className="bug"
      >
        <h3>bug report</h3>
        <input
          disabled={submitted}
          name="bug"
          value={bug}
          onChange={({ target: { value } }) => setBug(value)}
          required
          type="text"
          placeholder="Describe Your problem"
        />
        <button
          className={`accent${submitted ? ` submitted` : ``}`}
          disabled={!bug || submitted}
          type="submit"
        >
          {submitted ? `Report sent! Thank You` : `Send`}
        </button>
      </form>
      <div className="other">
        <h3>other</h3>
        <div>
          <De
            url="https://t.me/TierOhneNation"
            name="R4IN80W"
            title="Plugin & icon designer"
            image={designer}
          />
          <De
            url="http://t.me/chebarash"
            name="chebarash"
            title="Plugin developer"
            image={developer}
          />
        </div>
        <a
          href="http://boosty.to/480design"
          target="_blank"
          rel="noreferrer"
          className="boosty"
        >
          <svg width="17" height="20" viewBox="0 0 17 20" fill="none">
            <path
              d="M0.542366 11.9471L4.06972 0H9.4906L8.39777 3.7037C8.38695 3.72487 8.37613 3.74603 8.36531 3.7672L5.48716 13.545H8.17054C7.04525 16.2857 6.16882 18.4339 5.54126 19.9894C0.585647 19.9365 -0.799328 16.4656 0.412525 12.3598M5.5629 20L12.0982 10.8042H9.3283L11.7412 4.91005C15.8745 5.33333 17.8221 8.51852 16.6751 12.3704C15.4525 16.5079 10.4969 20 5.6711 20C5.62782 20 5.59536 20 5.5629 20Z"
              fill="var(--boosty)"
            />
          </svg>
          Support us
        </a>
      </div>
    </div>
  );
};

export default Menu;
