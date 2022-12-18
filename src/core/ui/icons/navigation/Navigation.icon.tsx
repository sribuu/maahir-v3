import * as React from "react";

export interface INavigationIconProps
  extends React.SVGAttributes<HTMLOrSVGElement> {}

export default function NavigationIcon(props: INavigationIconProps) {
  // const { fill, ...restProps } = props;
  return (
    <svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 10.9167H8.83L12.41 7.0275L11 5.5L5 12L11 18.5L12.41 16.9725L8.83 13.0833H19V10.9167Z"
        // fill="#0D1140"
        // fill={fill}
        {...props}
      />
    </svg>
  );
}
