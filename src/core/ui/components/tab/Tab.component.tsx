import React, { useState } from "react";
import clsx from "clsx";

export interface ITabComponentProps {
  list?: string[];
  onSelect?: (data: number) => void;
}
TabComponent.defaultProps = {
  list: [],
};

export default function TabComponent(props: ITabComponentProps) {
  const [active, setActive] = useState(0);

  const handleClickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(parseInt(e.currentTarget.id));
    if (props.onSelect) {
      props.onSelect(parseInt(e.currentTarget.id));
    }
  };
  return (
    <div className={clsx("flex items-start justify-start gap-x-[2rem]")}>
      {props.list !== undefined &&
        props.list.map((item, index) => (
          <button
            key={index}
            id={String(index)}
            className={clsx(
              "pb-[0.75rem]",
              index === active && "border-b-[0.125rem] border-b-ocean-boat-blue"
            )}
            onClick={handleClickTab}
          >
            <p
              className={clsx(
                "text-[1rem]",
                index === active ? "font-bold" : "font-regular",
                index === active ? "text-ocean-boat-blue" : "text-taupe-gray"
              )}
            >
              {item}
            </p>
          </button>
        ))}
    </div>
  );
}
