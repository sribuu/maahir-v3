import * as React from "react";

export interface IChevronIconProps extends React.HTMLAttributes<SVGElement> {}

export default function ChevronIcon(props: IChevronIconProps) {
  return (
    <svg {...props}>
      <path d="M7.83984 7.41L12.4198 12L7.83984 16.59L9.24984 18L15.2498 12L9.24984 6L7.83984 7.41Z" />
    </svg>
  );
}
