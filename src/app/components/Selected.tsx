import React, { useEffect, useState } from "react";
import IconsConsumer, { IconsType } from "../hooks/icons";
import Icons from "./Icons";
import Page from "./Page";

const Selected = ({ close }: { close: () => any }) => {
  const { selected, setSelected, importIcons } = IconsConsumer();
  const [i, setI] = useState<IconsType>();

  const selectedLength = Object.keys(selected).length;

  useEffect(() => {
    const d: IconsType = {};
    Object.entries(selected).forEach(([n, icon]) => {
      const [style, category, name]: Array<string> = n.split(` / `);
      if (!d[category]) d[category] = {};
      if (!d[category][name]) d[category][name] = {};
      d[category][name][style] = icon;
    });
    setI(d);
  }, []);

  return (
    <Page
      title={`${selectedLength} Selected icon${selectedLength != 1 ? `s` : ``}`}
      close={close}
      clear={() => setSelected({})}
      footer={
        <div className={`fade${selectedLength ? ` active` : ``}`}>
          <button className="medium" onClick={() => importIcons(selected)}>
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
