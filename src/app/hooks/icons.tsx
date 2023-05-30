import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

class Message {
  constructor(private setLoading: Dispatch<SetStateAction<boolean>>) {}
  private msg(
    type: string,
    value: string | Array<string> | { [name: string]: string }
  ) {
    this.setLoading(true);
    parent.postMessage(
      {
        pluginMessage: { type, value },
      },
      "*"
    );
  }
  import(selected: { [name: string]: string }) {
    this.msg(`import`, selected);
  }
  error() {
    this.msg(`error`, []);
  }
}

export type IconType = {
  [style: string]: string;
};

export type IconsType = {
  [category: string]: {
    [name: string]: IconType;
  };
};

export type StylesType = Array<{ name: string; icon: any }>;

export type ContextType = {
  icons: IconsType;
  filteredIcons: IconsType;
  loading: boolean;
  style: string;
  category: Array<string>;
  setCategory: Dispatch<SetStateAction<Array<string>>>;
  styles: StylesType;
  setStyle: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selected: { [name: string]: string };
  setSelected: Dispatch<SetStateAction<{ [name: string]: string }>>;
  toggleSelected: (style: string, category: string, name: string) => () => any;
  banner: boolean;
  setBanner: Dispatch<SetStateAction<boolean>>;
  message: Message;
  error?: string;
  disclaimer: boolean;
  hideDisclaimer: (dontShow: boolean) => any;
  len: number;
};

const defaults: ContextType = {
  icons: {},
  filteredIcons: {},
  loading: true,
  style: `Linear`,
  category: [],
  setCategory: () => {},
  setStyle: () => {},
  styles: [
    {
      name: `Linear`,
      icon: (
        <path
          d="M5.75736 5.75736C3.41421 8.1005 3.41421 11.8995 5.75736 14.2426C8.1005 16.5858 11.8999 16.5858 14.2431 14.2426C16.5862 11.8995 16.5858 8.10051 14.2426 5.75736C11.8995 3.41421 8.1005 3.41421 5.75736 5.75736Z"
          stroke="var(--fg)"
        />
      ),
    },
    {
      name: `Line Duotone`,
      icon: (
        <>
          <path
            d="M5.75736 5.75736C3.41421 8.1005 3.41421 11.8995 5.75736 14.2426L14.2426 5.75736C11.8995 3.41421 8.10051 3.41421 5.75736 5.75736Z"
            stroke="var(--fg)"
          />
          <path
            opacity="0.5"
            d="M5.75732 14.2426C8.10047 16.5858 11.8995 16.5858 14.2426 14.2426C16.5858 11.8995 16.5858 8.10047 14.2426 5.75732"
            stroke="var(--fg)"
          />
        </>
      ),
    },
    {
      name: `Bold`,
      icon: (
        <path
          d="M5.75736 14.2426C3.41421 11.8995 3.41421 8.1005 5.75736 5.75736C8.1005 3.41421 11.8995 3.41421 14.2426 5.75736C16.5858 8.10051 16.5862 11.8995 14.2431 14.2426C11.8999 16.5858 8.1005 16.5858 5.75736 14.2426Z"
          fill="var(--fg)"
        />
      ),
    },
    {
      name: `Bold Duotone`,
      icon: (
        <>
          <path
            d="M5.75736 5.75736C3.41421 8.1005 3.41421 11.8995 5.75736 14.2426L14.2426 5.75736C11.8995 3.41421 8.1005 3.41421 5.75736 5.75736Z"
            fill="var(--fg)"
          />
          <path
            opacity="0.5"
            d="M14.2426 14.2426C11.8995 16.5858 8.10047 16.5858 5.75732 14.2426L14.2426 5.75732C16.5858 8.10047 16.5858 11.8995 14.2426 14.2426Z"
            fill="var(--fg)"
          />
        </>
      ),
    },
    {
      name: `Broken`,
      icon: (
        <path
          d="M5.75736 5.75736C3.41421 8.1005 3.41421 11.8995 5.75736 14.2426C8.1005 16.5858 11.8999 16.5858 14.2431 14.2426C16.5862 11.8995 16.5858 8.10051 14.2426 5.75736C11.8995 3.41421 8.1005 3.41421 5.75736 5.75736Z"
          stroke="var(--fg)"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
      ),
    },
    {
      name: `Outline`,
      icon: (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16.0003 6.68595 16.0003 9.99965C16.0003 13.3134 13.3137 16 10 16ZM6.99999 10C7.00001 11.6569 8.34315 13 9.99999 13C11.6568 13 13.0001 11.6567 13.0001 9.9999C13.0001 8.34306 11.6568 7.00009 9.99993 7.00007C8.34309 7.00005 6.99997 8.34317 6.99999 10Z"
          fill="transparent"
          stroke="var(--fg)"
        />
      ),
    },
  ],
  search: ``,
  setSearch: () => {},
  selected: {},
  setSelected: () => {},
  toggleSelected: () => () => {},
  banner: true,
  setBanner: () => {},
  message: new Message(() => {}),
  disclaimer: false,
  hideDisclaimer: () => {},
  len: 0,
};

const IconsContext = createContext<ContextType>(defaults);

const toStr = (text: string) =>
  text.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "");

const useIcons = () => {
  const [icons, setIcons] = useState(defaults.icons);
  const [style, setStyle] = useState(defaults.style);
  const [category, setCategory] = useState(defaults.category);
  const [loading, setLoading] = useState<boolean>(defaults.loading);
  const [banner, setBanner] = useState<boolean>(defaults.banner);
  const [search, setSearch] = useState<string>(defaults.search);
  const [selected, setSelected] = useState<{ [name: string]: string }>(
    defaults.selected
  );
  const [error, setError] = useState<string>(defaults.error);
  const [disclaimer, setDisclaimer] = useState<boolean>(defaults.disclaimer);

  const toggleSelected = useCallback(
    (style: string, category: string, name: string) => () => {
      const str = `${style} / ${category} / ${name}`;
      if (selected[str]) {
        const { [str]: _, ...other } = selected;
        return setSelected(other);
      }
      setSelected({ [str]: icons[category][name][style], ...selected });
    },
    [selected, icons]
  );

  const hideDisclaimer = (dontShow: boolean) => {
    setDisclaimer(false);
    if (dontShow)
      parent.postMessage(
        {
          pluginMessage: { type: `disclaimer`, value: `` },
        },
        "*"
      );
  };

  useEffect(() => {
    window.onmessage = (event) => {
      setLoading(false);
      const err = event.data.pluginMessage.error;
      if (err) return setError(err);
      const { icons, disclaimer } = event.data.pluginMessage;
      setIcons(icons);
      setDisclaimer(disclaimer);
      setError(undefined);
    };
  }, [search]);

  const filteredIcons = Object.entries(icons)
    .filter(([c]) => (category.length ? category.includes(c) : true))
    .map(([c, n]) => [
      c,
      Object.fromEntries(
        Object.entries(n).filter(([name]) =>
          toStr(search).length ? toStr(name).includes(toStr(search)) : true
        )
      ),
    ]);

  return {
    ...defaults,
    icons,
    filteredIcons: Object.fromEntries(filteredIcons),
    loading,
    style,
    category,
    setCategory,
    setStyle,
    search,
    setSearch,
    selected,
    setSelected,
    toggleSelected,
    banner,
    setBanner,
    message: new Message(setLoading),
    error,
    disclaimer,
    hideDisclaimer,
    len: filteredIcons.length
      ? filteredIcons
          .map(([_n, v]) => Object.keys(v).length)
          .reduce((a, b) => a + b)
      : 0,
  };
};

export function IconsProvider({ children }) {
  const icons = useIcons();

  return (
    <IconsContext.Provider value={icons}>{children}</IconsContext.Provider>
  );
}

export default function IconsConsumer() {
  return useContext(IconsContext);
}
