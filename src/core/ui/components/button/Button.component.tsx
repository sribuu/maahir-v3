import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export interface IButtonComponentProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export type IButtonStylesProps = VariantProps<typeof buttonStyles>;
export const buttonStyles = cva(
  [
    // default styles
    "rounded-xl",
    "font-bold",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-ocean-boat-blue", "text-white", "border-transparent"],
        secondary: [
          "bg-white",
          "text-ocean-boat-blue",
          "border-ocean-boat-blue",
          "border",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-4", "px-4"],
      },
    },
    // TODO: need rethinking compound
    compoundVariants: [
      {
        intent: "primary",
        size: "medium",
        class: "uppercase",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);
ButtonComponent.defaultProps = {};

export interface Props extends IButtonComponentProps, IButtonStylesProps {}

export default function ButtonComponent({ intent, size, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button className={buttonStyles({ intent, size })} onClick={handleClick}>
      {props.children}
    </button>
  );
}
