import React, { useState } from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import IconsConsumer, { IconsType } from "../hooks/icons";
import Icon from "./Icon";

const columns = [`left`, `centre`, `centre`, `centre`, `right`];

const Cell = ({
  columnIndex,
  rowIndex,
  style: s,
  data: { icons, height, selected, style, scrollTop, toggleSelected },
}: GridChildComponentProps) => {
  if (!icons[rowIndex * 5 + columnIndex]) return <></>;
  const [{ category, name, style: iconStyle }, styles] =
    icons[rowIndex * 5 + columnIndex];
  return (
    <Icon
      style={s}
      icon={iconStyle ? styles : styles[style]}
      name={name}
      selected={!!selected[`${iconStyle || style} / ${category} / ${name}`]}
      select={toggleSelected(iconStyle || style, category, name)}
      position={(offsetTop: number) =>
        [
          columns[columnIndex],
          scrollTop + height - offsetTop - 70 > 80 ? `bottom` : `top`,
        ].join(` `)
      }
    />
  );
};

const Icons = ({ i }: { i?: IconsType }) => {
  const { banner, len, filteredIcons, selected, style, toggleSelected } =
    IconsConsumer();
  const [scrollTop, setScrollTop] = useState<number>(0);
  const iEntries = i ? Object.entries(i) : [];
  const iLen = iEntries.length
    ? iEntries
        .map(([_n, v]) => Object.values(v).map((e) => Object.keys(e).length))
        .flat()
        .reduce((a, b) => a + b)
    : 0;
  const height = i
    ? 397
    : (Object.keys(selected).length ? 345 : 405) - (banner ? 55 : 0);
  return (
    <div className="listBox">
      <Grid
        className="list"
        onScroll={({ scrollTop }) => setScrollTop(scrollTop)}
        columnCount={5}
        columnWidth={70}
        height={height}
        rowCount={Math.ceil((i ? iLen : len) / 5)}
        rowHeight={70}
        width={372}
        itemData={{
          icons: Object.entries(i || filteredIcons)
            .map(([category, icons]) =>
              Object.entries(icons).map(([name, styles]) =>
                i
                  ? Object.entries(styles).map(([style, icon]) => [
                      { category, name, style },
                      icon,
                    ])
                  : [{ category, name }, styles]
              )
            )
            .flat(i ? 2 : 1),
          height,
          selected,
          style,
          scrollTop,
          toggleSelected,
        }}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default Icons;
