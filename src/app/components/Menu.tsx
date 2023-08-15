import React, { useEffect, useRef, useState } from "react";
import developer from "../assets/developer.jpg";
import designer from "../assets/designer.jpg";
import Page from "./Page";

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

const Oth = ({ url, name, icon }: { url: string; name: string; icon: any }) => (
  <a href={url} target="_blank" rel="noreferrer" className="oth">
    <span>{icon}</span>
    <div>
      <p>{name}</p>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "50px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [bug]);

  return (
    <Page title="Main menu" close={close}>
      <div className="menu">
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
          <textarea
            disabled={submitted}
            required
            name="bug"
            placeholder="Describe Your problem"
            ref={textareaRef}
            value={bug}
            onChange={(e) => setBug(e.target.value)}
          />
          <button
            className={`accent${submitted ? ` submitted` : ``}`}
            disabled={!bug || submitted}
            type="submit"
          >
            {submitted ? `Report sent! Thank You` : `Send`}
          </button>
        </form>
        <div className="credits">
          <h3>credits</h3>
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
        <div className="other">
          <h3>other</h3>
          <div>
            <Oth
              url="https://github.com/480-Design/Solar-Icon-Set"
              name="SIS React Library"
              icon={
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5 0C16.2991 0 21 4.81943 21 10.7656C21 15.521 17.9949 19.5552 13.8253 20.98C13.293 21.0861 13.104 20.7499 13.104 20.4632C13.104 20.1083 13.1166 18.9491 13.1166 17.5085C13.1166 16.5047 12.7806 15.8496 12.4037 15.5157C14.742 15.249 17.199 14.3386 17.199 10.2037C17.199 9.02766 16.7916 8.06801 16.1175 7.31411C16.2267 7.04216 16.5868 5.94715 16.0146 4.46455C16.0146 4.46455 15.1347 4.17608 13.1302 5.56838C12.2913 5.33003 11.3925 5.21011 10.5 5.20591C9.6075 5.21011 8.70975 5.33003 7.87185 5.56838C5.8653 4.17608 4.9833 4.46455 4.9833 4.46455C4.41315 5.94715 4.7733 7.04216 4.88145 7.31411C4.2105 8.06801 3.79995 9.02766 3.79995 10.2037C3.79995 14.3281 6.2517 15.2525 8.58375 15.5244C8.28345 15.7932 8.0115 16.2674 7.917 16.9636C7.3185 17.2387 5.7981 17.7148 4.8615 16.0694C4.8615 16.0694 4.30605 15.035 3.25185 14.9594C3.25185 14.9594 2.2281 14.9458 3.18045 15.6136C3.18045 15.6136 3.8682 15.9444 4.34595 17.1886C4.34595 17.1886 4.9623 19.1101 7.8834 18.4591C7.88865 19.3589 7.8981 20.207 7.8981 20.4632C7.8981 20.7478 7.7049 21.0808 7.18095 20.981C3.00825 19.5583 0 15.5221 0 10.7656C0 4.81943 4.7019 0 10.5 0Z"
                    fill="var(--otherBg)"
                  />
                </svg>
              }
            />
            <Oth
              url="https://www.figma.com/community/file/1166831539721848736"
              name="SIS Figma Page"
              icon={
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path
                    d="M18 3.5C18 1.56703 16.321 0 14.25 0H6.75C4.67896 0 3 1.56703 3 3.5C3 5.43297 4.67896 7 6.75 7C4.67896 7 3 8.56703 3 10.5C3 12.433 4.67896 14 6.75 14C4.67896 14 3 15.567 3 17.5C3 19.433 4.67896 21 6.75 21C8.82104 21 10.5 19.433 10.5 17.5V10.5V7H14.25C16.321 7 18 5.43297 18 3.5Z"
                    fill="var(--otherBg)"
                  />
                  <path
                    d="M10.5 10.5C10.5 12.433 12.179 14 14.25 14C16.321 14 18 12.433 18 10.5C18 8.56703 16.321 7 14.25 7C12.179 7 10.5 8.56703 10.5 10.5Z"
                    fill="var(--otherBg)"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Menu;
