import * as React from "react";

export interface IFilterIconProps
  extends React.SVGAttributes<HTMLOrSVGElement> {}

export default function FilterIcon(props: IFilterIconProps) {
  return (
    <svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.54157 4.67516C5.4749 7.1585 8.33324 10.8335 8.33324 10.8335V15.0002C8.33324 15.9168 9.08324 16.6668 9.9999 16.6668V16.6668C10.9166 16.6668 11.6666 15.9168 11.6666 15.0002V10.8335C11.6666 10.8335 14.5249 7.1585 16.4582 4.67516C16.8832 4.12516 16.4916 3.3335 15.7916 3.3335H4.1999C3.50824 3.3335 3.11657 4.12516 3.54157 4.67516Z"
        {...props}
      />
    </svg>
  );
}
