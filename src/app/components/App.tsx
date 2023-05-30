import React, { useState } from "react";

import "../styles/ui.css";

import Main from "./Main";
import Menu from "./Menu";
import Search from "./Search";
import Settings from "./Settings";
import Selected from "./Selected";
import Disclaimer from "./Disclaimer";
import IconsConsumer from "../hooks/icons";

function App() {
  const [settings, setSettings] = useState<boolean>(false);
  const [page, setPage] = useState<string>(``);
  const catSearch = useState<string>(``);
  const { disclaimer } = IconsConsumer();

  switch (page) {
    case ``:
      return (
        <div className="app">
          {disclaimer && <Disclaimer />}
          <Search
            open={settings}
            settings={setSettings}
            menu={() => setPage(`menu`)}
            catSearch={catSearch}
          />
          {settings ? (
            <Settings catSearch={catSearch[0]} />
          ) : (
            <Main menu={() => setPage(`selected`)} />
          )}
        </div>
      );
    case `menu`:
      return <Menu close={() => setPage(``)} />;
    case `selected`:
      return <Selected close={() => setPage(``)} />;
  }
}

export default App;
