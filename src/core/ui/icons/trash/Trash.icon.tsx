import * as React from "react";

export interface ITrashIconProps
  extends React.SVGAttributes<HTMLOrSVGElement> {}

export default function TrashIcon(props: ITrashIconProps) {
  return (
    <svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.88888 10.6293C3.88888 11.1997 4.35555 11.6663 4.92592 11.6663H9.07407C9.64444 11.6663 10.1111 11.1997 10.1111 10.6293V4.40708H3.88888V10.6293ZM10.6296 2.85153H8.81481L8.29629 2.33301H5.70369L5.18518 2.85153H3.37036V3.88856H10.6296V2.85153Z"
      />
    </svg>
  );
}
