import * as React from "react";

export interface IEmailIconProps extends React.HTMLAttributes<SVGElement> {}

export default function EmailIcon(props: IEmailIconProps) {
  return (
    <svg {...props}>
      <g clipPath="url(#clip0_1832_6266)">
        <path
          d="M16.6667 3.33325H3.33335C2.41669 3.33325 1.67502 4.08325 1.67502 4.99992L1.66669 14.9999C1.66669 15.9166 2.41669 16.6666 3.33335 16.6666H16.6667C17.5834 16.6666 18.3334 15.9166 18.3334 14.9999V4.99992C18.3334 4.08325 17.5834 3.33325 16.6667 3.33325ZM16.6667 6.66659L10 10.8333L3.33335 6.66659V4.99992L10 9.16659L16.6667 4.99992V6.66659Z"
          fill="#4F5A66"
        />
      </g>
      <defs>
        <clipPath id="clip0_1832_6266">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}