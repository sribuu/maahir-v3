import * as React from "react";

export interface IButtonComponentProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
ButtonComponent.defaultProps = {
  className: "",
};

export default function ButtonComponent(props: IButtonComponentProps) {
  const defaultStyle = "px-4 py-2 rounded-lg";
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };
  return (
    <button
      className={`${defaultStyle} ${props.className}`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
