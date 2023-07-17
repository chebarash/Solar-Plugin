figma.showUI(__html__, { width: 390, height: 530 });

type Icons = {
  [category: string]: {
    [name: string]: {
      [style: string]: string;
    };
  };
};
let icons: Icons = {};
let error: string = ``;
const toasts = [
  `🔥 Awesome`,
  `❤️ Thank You!`,
  `🌌 Yay!`,
  `✨ Great choice!`,
  `😉 We like those too`,
  `🤘 You rock!`,
  `💖 You\`re breathtaking!`,
];
const baseUrl = `https://solariconset.com/`;
let disclaimer: boolean = true;

const load = async () => {
  try {
    const ico = figma.root.getPluginData(`icons`);
    const dat = figma.root.getPluginData(`date`);
    disclaimer = !figma.root.getPluginData(`disclaimer`);
    if (
      ico.length &&
      dat.length &&
      Date.now() - parseInt(dat) < 1000 * 60 * 60 * 24
    ) {
      await fetch(`${baseUrl}load`);
      icons = JSON.parse(ico);
    } else {
      const response = await fetch(`${baseUrl}data`);
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

const getIcons = () => {
  if (!Object.keys(icons).length) return { error };
  figma.ui.postMessage({ icons, disclaimer });
};

figma.ui.onmessage = async ({
  type,
  value,
}: {
  type: string;
  value: string | { [name: string]: string };
}) => {
  switch (type) {
    case `error`:
      load();
      break;
    case `disclaimer`:
      figma.root.setPluginData(`disclaimer`, `true`);
      disclaimer = false;
      break;
    case `report`:
      await fetch(
        `${baseUrl}report?bug=${encodeURIComponent(value as string)}`
      );
      break;
    case `import`:
      if (typeof value !== `object`) return;
      await fetch(
        `${baseUrl}import?icons=${Object.keys(value)
          .map((v) => encodeURIComponent(v))
          .join(`&icons=`)}`
      );
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
