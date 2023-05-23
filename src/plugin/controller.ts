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

const toStr = (text: string) =>
  text.toLocaleLowerCase().replace(/[-_]+/g, "").replace(/ /g, "");

const getIcons = async () => {
  try {
    const response = await fetch(
      `${back}data?page=${page}&search=${search}&categories=${c.join(
        `&categories=`
      )}`
    );
    if (response.status == 400)
      return figma.ui.postMessage({ error: (await response.json()).message });
    figma.ui.postMessage(await response.json());
  } catch (err) {
    error = err.message.replace(
      `Failed to fetch`,
      `Sorry, we couldn't run the plugin!`
    );
    figma.ui.postMessage({ error });
  }
};

getIcons();

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
      await getIcons();
      break;
    case `category`:
      if (c != value) page = 0;
      c = value as Array<string>;
      await getIcons();
      break;
    case `search`:
      page = 0;
      search = toStr(value as unknown as string);
      await getIcons();
      break;
    case `error`:
      await getIcons();
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
