import * as React from "react";

export interface ICloseIconProps extends React.HTMLAttributes<SVGElement> {}

export default function CloseIcon(props: ICloseIconProps) {
  return (
    <svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6668 4.67635L15.324 3.3335L10.0002 8.65731L4.67635 3.3335L3.3335 4.67635L8.65731 10.0002L3.3335 15.324L4.67635 16.6668L10.0002 11.343L15.324 16.6668L16.6668 15.324L11.343 10.0002L16.6668 4.67635Z"
      />
    </svg>
  );
}
