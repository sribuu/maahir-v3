import * as React from "react";

export interface IPencilIconProps extends React.HTMLAttributes<SVGElement> {}

export default function PencilIcon(props: IPencilIconProps) {
  return (
    <svg {...props}>
      <path d="M0.5 14.25V18H4.25L15.31 6.93997L11.56 3.18997L0.5 14.25ZM17.0424 5.21496C18.0744 4.17883 18.0728 2.50275 17.0387 1.46867C16.0017 0.431689 14.3199 0.433348 13.285 1.47237L12.63 2.12997L16.38 5.87997L17.0424 5.21496Z" />
    </svg>
  );
}
