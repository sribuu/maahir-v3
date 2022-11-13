import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export interface IButtonComponentProps {
  id?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export type IButtonStylesProps = VariantProps<typeof buttonStyles>;
export const buttonStyles = cva(
  [
    // default styles
    "rounded-xl",
    "font-bold",
    "normal-case",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-ocean-boat-blue",
          "disabled:opacity-40",
          "text-white",
          "border-transparent",
        ],

        secondary: [
          "bg-white",
          "text-ocean-boat-blue",
          "border-ocean-boat-blue",
          "border",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-[0.875rem]", "py-4", "px-4"],
      },
    },
    // TODO: need rethinking compound
    compoundVariants: [
      {
        intent: "primary",
        size: "medium",
        class: "normal-case",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);
ButtonComponent.defaultProps = {
  id: "",
  disabled: false,
};

export interface Props extends IButtonComponentProps, IButtonStylesProps {}

export default function ButtonComponent({ intent, size, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button
      id={props.id}
      disabled={props.disabled}
      className={buttonStyles({ intent, size })}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
