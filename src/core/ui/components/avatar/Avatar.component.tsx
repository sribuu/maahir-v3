import * as React from "react";
import clsx from "clsx";

export interface IAvatarComponentProps {
  text?: string;
}
AvatarComponent.defaultProps = {
  text: "",
};

export default function AvatarComponent(props: IAvatarComponentProps) {
  return (
    <div
      className={clsx(
        "flex justify-center items-center",
        "w-[40px] h-[40px] rounded-[50%]",
        "bg-mauve",
        "box-border"
      )}
    >
      <p className={clsx("text-[1.5rem] text-bold text-white")}>{props.text}</p>
    </div>
  );
}
