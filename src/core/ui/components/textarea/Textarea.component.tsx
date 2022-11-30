import clsx from "clsx";
import React from "react";

export interface ITextareaComponentProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  endAddornment?: React.ReactNode;
  invalid?: string;
  helpertext?: string;
}
TextareaComponent.defaultProps = {
  label: "",
  invalid: "false",
  helpertext: "",
};

export default function TextareaComponent(props: ITextareaComponentProps) {
  const { className, disabled, ...restProps } = props;

  return (
    <div className={clsx("grid grid-cols-1", "gap-y-[0.25rem]", "w-full")}>
      <label
        className={clsx(
          "text-[0.875rem] font-regular",
          !disabled ? "text-charleston-green" : "text-taupe-gray"
        )}
        htmlFor={props.id}
      >
        {props.label}
      </label>

      <div
        className={clsx(
          "flex justify-between gap-4",
          "w-full p-4 h-[138px]",
          "rounded-[0.625rem]",
          "box-border",
          !disabled ? "bg-white" : "bg-bright-gray",
          props.invalid === "true"
            ? "border border-tart-orange"
            : "border border-gainsboro "
        )}
      >
        <textarea
          className={clsx(
            "w-full",
            !disabled ? "bg-white bg-opacity-0" : "bg-bright-gray",
            "outline-0",
            "placeholder:text-taupe-gray placeholder:font-regular placeholder:text-[1rem]",
            className
          )}
          {...restProps}
        />
        {props.endAddornment && props.endAddornment}
      </div>

      {props.helpertext !== undefined && props.helpertext.length > 0 && (
        <p
          className={clsx(
            props.invalid === "true" ? "text-tart-orange" : "text-taupe-gray",
            "text-[0.75rem] font-regular"
          )}
        >
          {props.helpertext}
        </p>
      )}
    </div>
  );
}
