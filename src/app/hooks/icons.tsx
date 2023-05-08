import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import icLinear from "../components/lotties/ic_linear.json";
import icLineDuotone from "../components/lotties/ic_line_duotone.json";
import icBold from "../components/lotties/ic_bold.json";
import icBoldDuotone from "../components/lotties/ic_bold_duotone.json";
import icBroken from "../components/lotties/ic_broken.json";
import icOutline from "../components/lotties/ic_outline.json";

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
}

type Icon = {
  [style: string]: string;
};

type Icons = {
  [category: string]: {
    [name: string]: Icon;
  };
};

type Categories = Array<{
  name: string;
  icon: Icon;
  length: number;
}>;

type Styles = Array<{ name: string; icon: any }>;

type Context = {
  prev: boolean;
  next: boolean;
  icons: Icons;
  loading: boolean;
  style: string;
  category: Array<string>;
  setCategory: Dispatch<SetStateAction<Array<string>>>;
  categories: Categories;
  setCategories: Dispatch<SetStateAction<Categories>>;
  styles: Styles;
  setStyle: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selected: Array<string>;
  setSelected: Dispatch<SetStateAction<Array<string>>>;
  banner: boolean;
  setBanner: Dispatch<SetStateAction<boolean>>;
  message: Message;
};

const defaults: Context = {
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
    { name: `Linear`, icon: icLinear },
    { name: `Line Duotone`, icon: icLineDuotone },
    { name: `Bold`, icon: icBold },
    { name: `Bold Duotone`, icon: icBoldDuotone },
    { name: `Broken`, icon: icBroken },
    { name: `Outline`, icon: icOutline },
  ],
  search: ``,
  setSearch: () => {},
  selected: [],
  setSelected: () => {},
  banner: true,
  setBanner: () => {},
  message: new Message(() => {}),
};

const IconsContext = createContext<Context>(defaults);

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

  useEffect(() => {
    window.onmessage = (event) => {
      if (
        search.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "") !=
        event.data.pluginMessage.search
      )
        return;
      const { icons, categories, prev, next } = event.data.pluginMessage;
      setIcons(icons);
      setCategories(categories);
      setLoading(false);
      setPrev(prev);
      setNext(next);
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
