import React, { useEffect, useState } from "react";
import IconsConsumer, { IconsType } from "../hooks/icons";
import Icons from "./Icons";
import Page from "./Page";

const Selected = ({ close }: { close: () => any }) => {
  const { icons, selected, setSelected, message } = IconsConsumer();
  const [i, setI] = useState<IconsType>();

  useEffect(() => {
    const d: IconsType = {};
    selected.forEach((n) => {
      const [style, category, name]: Array<string> = n.split(` / `);
      if (!d[category]) d[category] = {};
      if (!d[category][name]) d[category][name] = {};
      d[category][name][style] = icons[category][name][style];
    });
    setI(d);
  }, []);

  return (
    <Page
      title={`${selected.length} Selected icons`}
      close={close}
      r={() => {
        if (!selected.length) close();
      }}
      clear={() => setSelected([])}
      footer={
        <div className={`fade${selected.length ? ` active` : ``}`}>
          <button className="medium" onClick={() => message.import(selected)}>
            IMPORT
          </button>
        </div>
      }
    >
      {!!i && <Icons i={i} />}
    </Page>
  );
};

export default Selected;
