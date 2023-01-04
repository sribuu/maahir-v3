import * as React from "react";

export interface IHideIconProps extends React.HTMLAttributes<SVGElement> {}

export default function HideIcon(props: IHideIconProps) {
  return (
    <svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 19C18.0228 19 22.5 12 22.5 12C22.5 12 18.0228 5 12.5 5C6.97715 5 2.5 12 2.5 12C2.5 12 6.97715 19 12.5 19ZM12.5 16C14.7091 16 16.5 14.2091 16.5 12C16.5 9.79086 14.7091 8 12.5 8C10.2909 8 8.5 9.79086 8.5 12C8.5 14.2091 10.2909 16 12.5 16Z"
      />
    </svg>
  );
}
