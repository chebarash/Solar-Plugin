import Scrollbars from "react-custom-scrollbars-2";
import Lottie from "react-lottie";
import React, { useState } from "react";
import "../styles/ui.css";
import icons from "../../../data.json";
import Search from "./Search";
import icBold from "./lotties/ic_bold.json";
import icBoldDuotone from "./lotties/ic_bold_duotone.json";
import icBroken from "./lotties/ic_broken.json";
import icLineDuotone from "./lotties/ic_line_duotone.json";
import icLinear from "./lotties/ic_linear.json";
import icOutline from "./lotties/ic_outline.json";
import searchErr from "../assets/ill_search_err.png";
import Main from "./Main";
import Settings from "./Settings";
import Menu from "./Menu";

const toStr = (text: string) =>
  text.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "");

function App() {
  const [list, setList] = useState<{
    [category: string]: {
      [name: string]: Array<string>;
    };
  }>(icons);
  const categories = useState<
    Array<{ name: string; selected: boolean; len: number; icon: any }>
  >(
    Object.keys(list).map((name) => ({
      name,
      selected: false,
      len: Object.keys(list[name]).length,
      icon: Object.keys(list[name])[0],
    }))
  );
  const settings = useState<boolean>(false);
  const menu = useState<boolean>(false);
  const [search, setSearch] = useState<string>(``);
  const [styles, setStyles] = useState<
    Array<{ name: string; icon: any; selected: boolean }>
  >([
    { name: `Linear`, icon: icLinear, selected: true },
    { name: `Line Duotone`, icon: icLineDuotone, selected: false },
    { name: `Bold`, icon: icBold, selected: false },
    { name: `Bold Duotone`, icon: icBoldDuotone, selected: false },
    { name: `Broken`, icon: icBroken, selected: false },
    { name: `Outline`, icon: icOutline, selected: false },
  ]);
  const [viewSize, setSize] = useState<{
    height: number;
    width: number;
  }>();

  const selected = Object.values(list)
    .map((n) => {
      return Object.values(n).flat().length;
    })
    .reduce((a, b) => a + b);

  const searchRes = Object.values(list)
    .map((n) => Object.keys(n))
    .flat()
    .filter((name) => toStr(name).includes(toStr(search)));

  const filAct = categories[0].filter(({ selected }) => selected).length;

  const res = Object.fromEntries(
    Object.entries(list)
      .filter(
        ([key]) =>
          categories[0].find(({ name }) => key === name).selected || !filAct
      )
      .map(([key, val]) => [
        key,
        Object.fromEntries(
          Object.entries(val).filter(([key]) =>
            toStr(search).length ? searchRes.includes(key) : true
          )
        ),
      ])
      .filter(([_key, val]) => Object.keys(val).length)
  );

  return menu[0] ? (
    <Menu menu={menu} />
  ) : (
    <div className="app">
      <Search
        value={search}
        state={settings}
        menu={menu}
        number={categories[0].filter(({ selected }) => selected).length}
        onChange={setSearch}
      />
      <div className={`styleBox${settings[0] ? ` hidden` : ``}`}>
        {styles.map(({ name: n, icon, selected }) => (
          <button
            key={n}
            disabled={selected}
            className={`style${selected ? ` active` : ``}`}
            onClick={() =>
              setStyles((s) =>
                s.map(({ name, icon }) => ({
                  name,
                  selected: name === n,
                  icon,
                }))
              )
            }
          >
            <Lottie
              options={{
                loop: false,
                autoplay: false,
                animationData: icon,
              }}
              height={20}
              width={20}
              isStopped={!selected}
            />
          </button>
        ))}
      </div>
      <Scrollbars
        ref={(el) => {
          if (!el || viewSize) return;
          const { getClientWidth, getClientHeight } = el;
          setSize({ height: getClientHeight(), width: getClientWidth() });
        }}
        style={{
          height: `calc(100vh - ${
            (selected ? 140 : 90) + (settings[0] ? 0 : 40)
          }px)`,
        }}
        renderView={({ style, ...props }) => {
          return (
            <div
              style={{ ...style, padding: `15px 20px 40px 20px` }}
              {...props}
            />
          );
        }}
        renderTrackVertical={({ style, ...props }) => (
          <div className="track" {...props} />
        )}
        renderThumbVertical={({ style, ...props }) => (
          <div style={{ ...style }} className="thumb" {...props} />
        )}
      >
        {settings[0] ? (
          <Settings categories={categories} />
        ) : Object.keys(res).length ? (
          <Main
            size={viewSize}
            list={[res, setList]}
            styles={styles.find(({ selected }) => selected)}
          />
        ) : (
          <div className="searchErr">
            <img src={searchErr} alt="Search error" />
            <p>We couldn't find anything...</p>
            <button onClick={() => setSearch(``)}>Back to main screen</button>
          </div>
        )}
      </Scrollbars>
      <div className={`fade${selected ? ` active` : ``}`}>
        <p>{selected} ICONS SELECTED</p>
        <button>Import</button>
      </div>
    </div>
  );
}

export default App;
