import * as React from "react";
import clsx from "clsx";

export interface IBackdropComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function BackdropComponent(props: IBackdropComponentProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 bottom-0 right-0 z-40",
        "bg-dark-charcoal bg-opacity-20"
      )}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
}
