import * as React from "react";

export interface IHamburgerMenuIconProps
  extends React.SVGAttributes<HTMLOrSVGElement> {}

export default function HamburgerMenuIcon(props: IHamburgerMenuIconProps) {
  const { fill, stroke, width, height, ...restProps } = props;
  return (
    <svg fill={"none"} {...restProps} width={width} height={height}>
      <g clipPath="url(#clip0_1503_4912)">
        <path
          d="M8 18.5H20V17.1667H8V18.5ZM8 15.1667H20V13.8333H8V15.1667ZM8 10.5V11.8333H20V10.5H8Z"
          fill={fill}
        />
      </g>
      <rect x="0.5" y="1" width="27" height="27" rx="7.5" stroke={stroke} />
      <defs>
        <clipPath id="clip0_1503_4912">
          <rect
            width="16"
            height="16"
            fill={fill}
            transform="translate(6 6.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
