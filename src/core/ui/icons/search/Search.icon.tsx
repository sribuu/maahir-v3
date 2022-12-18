import * as React from "react";

export interface ISearchIconProps
  extends React.SVGAttributes<HTMLOrSVGElement> {}

export default function SearchIcon(props: ISearchIconProps) {
  return (
    <svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7503 16.5718C18.0743 16.8958 18.0754 17.42 17.7477 17.7477C17.4223 18.0732 16.8964 18.0749 16.5718 17.7503L12.0478 13.2263C10.9963 14.0296 9.68228 14.5068 8.25684 14.5068C4.80506 14.5068 2.00684 11.7086 2.00684 8.25684C2.00684 4.80506 4.80506 2.00684 8.25684 2.00684C11.7086 2.00684 14.5068 4.80506 14.5068 8.25684C14.5068 9.68228 14.0296 10.9963 13.2263 12.0478L17.7503 16.5718ZM8.25684 12.8402C10.7881 12.8402 12.8402 10.7881 12.8402 8.25684C12.8402 5.72553 10.7881 3.6735 8.25684 3.6735C5.72553 3.6735 3.6735 5.72553 3.6735 8.25684C3.6735 10.7881 5.72553 12.8402 8.25684 12.8402Z"
        fill="#232931"
      />
    </svg>
  );
}
