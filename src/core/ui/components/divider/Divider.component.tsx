import * as React from "react";
import clsx from "clsx";

export interface IDividerComponentProps {}

export default function DividerComponent(props: IDividerComponentProps) {
  return <hr className={clsx("border border-bright-gray")} />;
}
