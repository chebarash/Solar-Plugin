figma.showUI(__html__, { width: 390, height: 530 });

type Icons = {
  [category: string]: {
    [name: string]: {
      [style: string]: string;
    };
  };
};
let icons: Icons = {};
let page: number = 0;
let c: Array<string> = [];
let search: string = ``;
let error: string = ``;
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

const load = async () => {
  try {
    const ico = figma.root.getPluginData(`icons`);
    const dat = figma.root.getPluginData(`date`);
    if (
      ico.length &&
      dat.length &&
      Date.now() - parseInt(dat) < 1000 * 60 * 60 * 24
    ) {
      icons = JSON.parse(ico);
    } else {
      const response = await fetch(`${back}data`);
      if (response.status == 400)
        return figma.ui.postMessage({ error: (await response.json()).message });
      icons = await response.json();
      figma.root.setPluginData(`icons`, JSON.stringify(icons));
      figma.root.setPluginData(`date`, `${Date.now()}`);
    }
    getIcons();
  } catch (err) {
    error = err.message.replace(
      `Failed to fetch`,
      `Sorry, we couldn't run the plugin!`
    );
    figma.ui.postMessage({ error });
  }
};

figma.on(`run`, load);

const toStr = (text: string) =>
  text.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "");

const getIcons = () => {
  if (!Object.keys(icons).length) return { error };
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
  figma.ui.postMessage({
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
    categories: Object.keys(icons).map((name) => ({
      name,
      icon: Object.values(icons[name])[0],
      length: Object.values(icons[name]).length,
    })),
    search,
    prev: !!page,
    next: len > page * lim + lim,
    len,
  });
};

figma.ui.onmessage = async ({
  type,
  value,
}: {
  type: string;
  value: string | Array<string> | { [name: string]: string };
}) => {
  switch (type) {
    case `page`:
      if (value.length) page++;
      else page--;
      if (page < 0) page = 0;
      getIcons();
      break;
    case `category`:
      if (c != value) page = 0;
      c = value as Array<string>;
      getIcons();
      break;
    case `search`:
      page = 0;
      search = toStr(value as unknown as string);
      getIcons();
      break;
    case `error`:
      getIcons();
      break;
    case `report`:
      await fetch(`${back}report?bug=${value}`);
      break;
    case `import`:
      if (typeof value !== `object`) return;
      await fetch(`${back}import?icons=${Object.keys(value).join(`&icons=`)}`);
      const nodes = [];
      Object.entries(value).forEach(([name, iconSvg], i) => {
        const icon = figma.createComponent();
        icon.resizeWithoutConstraints(24, 24);
        icon.constrainProportions = true;
        icon.x = i * 30;
        icon.name = name;
        const node = figma.createNodeFromSvg(iconSvg);
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
