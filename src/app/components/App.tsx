import React, { useState } from "react";

import "../styles/ui.css";

import Main from "./Main";
import Menu from "./Menu";
import Search from "./Search";
import Settings from "./Settings";
import Scrollbar from "./Scrollbar";
import Selected from "./Selected";

function App() {
  const [settings, setSettings] = useState<boolean>(false);
  const [page, setPage] = useState<string>(``);

  switch (page) {
    case ``:
      return (
        <div className="app">
          <Search settings={setSettings} menu={() => setPage(`menu`)} />
          {settings ? (
            <Scrollbar>
              <Settings />
            </Scrollbar>
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
