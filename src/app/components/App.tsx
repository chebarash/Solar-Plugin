import React, { useState } from "react";

import "../styles/ui.css";

import Main from "./Main";
import Menu from "./Menu";
import Search from "./Search";
import Settings from "./Settings";
import Selected from "./Selected";

function App() {
  const [settings, setSettings] = useState<boolean>(false);
  const [page, setPage] = useState<string>(``);
  const catSearch = useState<string>(``);

  switch (page) {
    case ``:
      return (
        <div className="app">
          <Search
            open={settings}
            settings={[settings, setSettings]}
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
