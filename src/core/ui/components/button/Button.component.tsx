import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export interface IButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export type IButtonStylesProps = VariantProps<typeof buttonStyles>;
export const buttonStyles = cva(
  [
    // default styles
    "rounded-xl",
    "font-bold",
    "normal-case",
    "inline-flex",
    "text-center",
    "items-center",
    "justify-center",
    "gap-x-[10px]",
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
        medium: ["text-[0.875rem]", "py-[0.5rem]", "px-[1rem]"],
        large: ["text-[0.875rem]", "py-4", "px-4"],
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

export default function ButtonComponent({
  intent,
  size,
  className,
  children,
  ...restProps
}: Props) {
  return (
    <button
      className={`${buttonStyles({ intent, size })} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
}
