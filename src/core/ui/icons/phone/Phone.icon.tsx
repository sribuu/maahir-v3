import * as React from "react";

export interface IPhoneIconProps extends React.HTMLAttributes<SVGElement> {}

export default function PhoneIcon(props: IPhoneIconProps) {
  return (
    <svg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.675 12.8167C15.65 12.8167 14.6583 12.65 13.7333 12.35C13.4417 12.25 13.1167 12.325 12.8917 12.55L11.5833 14.1917C9.225 13.0667 7.01667 10.9417 5.84167 8.5L7.46667 7.11667C7.69167 6.88333 7.75833 6.55833 7.66667 6.26667C7.35833 5.34167 7.2 4.35 7.2 3.325C7.2 2.875 6.825 2.5 6.375 2.5H3.49167C3.04167 2.5 2.5 2.7 2.5 3.325C2.5 11.0667 8.94167 17.5 16.675 17.5C17.2667 17.5 17.5 16.975 17.5 16.5167V13.6417C17.5 13.1917 17.125 12.8167 16.675 12.8167Z"
      />
    </svg>
  );
}
