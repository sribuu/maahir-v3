import * as React from "react";
import clsx from "clsx";

export interface ICardComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function CardComponent(props: ICardComponentProps) {
  const { className, ...restProps } = props;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "rounded-2xl w-full",
        "bg-white shadow-2",
        className
      )}
      {...restProps}
    >
      {props.children}
    </div>
  );
}
