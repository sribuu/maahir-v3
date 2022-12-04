import React, { useEffect, useState } from "react";
import clsx from "clsx";

export interface ISwitchToggleComponentProps {
  onSwitch?: (data: boolean) => void;
}

export default function SwitchToggleComponent(
  props: ISwitchToggleComponentProps
) {
  const [active, setActive] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(!active);
  };

  useEffect(() => {
    if (props.onSwitch) {
      props.onSwitch(active);
    }
  }, [active]);

  return (
    <button
      className={clsx(
        "w-[42px] h-[24px] rounded-[6.25rem] p-[3px] box-border",
        active ? "bg-ocean-boat-blue" : "bg-taupe-gray"
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          "w-[1.125rem] h-[1.125rem] rounded-[50%] box-border",
          "bg-white",
          active ? "translate-x-[18px]" : "translate-x-[0px]"
        )}
      />
    </button>
  );
}
