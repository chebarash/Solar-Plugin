figma.showUI(__html__, { width: 390, height: 530 });

type Icons = {
  [category: string]: {
    [name: string]: {
      [style: string]: string;
    };
  };
};

let icons: Icons = {};
let categories: Array<{
  name: string;
  icon: { [style: string]: string };
  length: number;
}> = [];
let page: number = 0;
let c: Array<string> = [];
let search: string = ``;
const lim = 100;
const toasts = [
  `🔥 Awesome`,
  `❤️ Thank You!`,
  `🌌 Yay!`,
  `✨ Great choice!`,
  `😉 We like those too`,
  `🤘 You rock!`,
  `💖 You\`re breathtaking!`,
];
const back = `https://solar-chebarashek.b4a.run/`;

const toStr = (text: string) =>
  text.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "");

const getIcons = () => {
  let num = 0;
  const ico = Object.entries(icons)
    .filter(([category]) => (c.length ? c.includes(category) : true))
    .map(([c, n]) => [
      c,
      Object.fromEntries(
        Object.entries(n).filter(([name]) =>
          search.length ? toStr(name).includes(search) : true
        )
      ),
    ]);
  const len = ico
    .map(([_n, v]) => Object.keys(v).length)
    .reduce((a, b) => a + b);
  if (len / lim < page) page--;
  return {
    icons: Object.fromEntries(
      ico.map(([c, l]) => {
        let s = lim * page - num;
        let e = lim * page - num + lim;
        if (s < 0) s = 0;
        if (e < 0) e = 0;
        const li = Object.fromEntries(Object.entries(l).slice(s, e));
        num += Object.keys(l).length;
        return [c, li];
      })
    ),
    categories,
    search,
    prev: !!page,
    next: len > page * lim + lim,
  };
};

(async () => {
  const response = await fetch(back);
  icons = (await response.json()) as Icons;
  categories = Object.keys(icons).map((name) => ({
    name,
    icon: Object.values(icons[name])[0],
    length: Object.values(icons[name]).length,
  }));
  figma.ui.postMessage(getIcons());
})();

figma.ui.onmessage = async ({
  type,
  value,
}: {
  type: string;
  value: Array<string>;
}) => {
  switch (type) {
    case `page`:
      if (value.length) page++;
      else page--;
      if (page < 0) page = 0;
      figma.ui.postMessage(getIcons());
      break;
    case `category`:
      if (c != value) page = 0;
      c = value;
      figma.ui.postMessage(getIcons());
      break;
    case `search`:
      page = 0;
      search = toStr(value as unknown as string);
      figma.ui.postMessage(getIcons());
      break;
    case `report`:
      await fetch(`${back}report?bug=${value}`);
      break;
    case `import`:
      const nodes = [];
      value.forEach((v, i) => {
        const [style, category, name]: Array<string> = v.split(` / `);
        const icon = figma.createComponent();
        icon.resizeWithoutConstraints(24, 24);
        icon.constrainProportions = true;
        icon.x = i * 30;
        icon.name = v;
        const node = figma.createNodeFromSvg(icons[category][name][style]);
        node.children.forEach((child) => icon.appendChild(child));
        node.remove();
        figma.currentPage.appendChild(icon);
        nodes.push(icon);
      });
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
      figma.notify(toasts[Math.floor(Math.random() * toasts.length)]);
      figma.closePlugin();
      break;
  }
};
