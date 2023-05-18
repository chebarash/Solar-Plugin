import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

class Message {
  constructor(private setLoading: Dispatch<SetStateAction<boolean>>) {}
  private msg(type: string, value: string | Array<string>) {
    this.setLoading(true);
    parent.postMessage(
      {
        pluginMessage: { type, value },
      },
      "*"
    );
  }
  prev() {
    this.msg(`page`, []);
  }
  next() {
    this.msg(`page`, [``]);
  }
  category(category: Array<string>) {
    this.msg(`category`, category);
  }
  search(search: string) {
    this.msg(`search`, search);
  }
  import(selected: Array<string>) {
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

export type CategoriesType = Array<{
  name: string;
  icon: IconType;
  length: number;
}>;

export type StylesType = Array<{ name: string; icon: any }>;

export type ContextType = {
  prev: boolean;
  next: boolean;
  icons: IconsType;
  loading: boolean;
  style: string;
  category: Array<string>;
  setCategory: Dispatch<SetStateAction<Array<string>>>;
  categories: CategoriesType;
  setCategories: Dispatch<SetStateAction<CategoriesType>>;
  styles: StylesType;
  setStyle: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selected: Array<string>;
  setSelected: Dispatch<SetStateAction<Array<string>>>;
  banner: boolean;
  setBanner: Dispatch<SetStateAction<boolean>>;
  message: Message;
  error?: string;
  len: number;
};

const defaults: ContextType = {
  prev: false,
  next: true,
  icons: {},
  loading: true,
  style: `Linear`,
  category: [],
  setCategory: () => {},
  categories: [],
  setCategories: () => {},
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
  selected: [],
  setSelected: () => {},
  banner: true,
  setBanner: () => {},
  message: new Message(() => {}),
  len: 0,
};

const IconsContext = createContext<ContextType>(defaults);

const useIcons = () => {
  const [prev, setPrev] = useState(defaults.prev);
  const [next, setNext] = useState(defaults.next);
  const [icons, setIcons] = useState(defaults.icons);
  const [style, setStyle] = useState(defaults.style);
  const [category, setCategory] = useState(defaults.category);
  const [categories, setCategories] = useState(defaults.categories);
  const [loading, setLoading] = useState<boolean>(defaults.loading);
  const [banner, setBanner] = useState<boolean>(defaults.banner);
  const [search, setSearch] = useState<string>(defaults.search);
  const [selected, setSelected] = useState<Array<string>>(defaults.selected);
  const [error, setError] = useState<string>(defaults.error);
  const [len, setLen] = useState<number>(defaults.len);

  useEffect(() => {
    window.onmessage = (event) => {
      setLoading(false);
      const err = event.data.pluginMessage.error;
      if (err) return setError(err);
      if (
        search.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "") !=
        event.data.pluginMessage.search
      )
        return;
      const { icons, categories, prev, next, len } = event.data.pluginMessage;
      setIcons(icons);
      setCategories(categories);
      setPrev(prev);
      setNext(next);
      setLen(len);
      setError(undefined);
    };
  }, [search]);

  return {
    ...defaults,
    prev,
    next,
    icons,
    loading,
    style,
    category,
    setCategory,
    categories,
    setCategories,
    setStyle,
    search,
    setSearch,
    selected,
    setSelected,
    banner,
    setBanner,
    message: new Message(setLoading),
    len,
    error,
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
