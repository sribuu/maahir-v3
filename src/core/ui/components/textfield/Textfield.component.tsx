import clsx from "clsx";
import React from "react";

export interface ITextfieldComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  endAddornment?: React.ReactNode;
}
TextfieldComponent.defaultProps = {
  label: "",
};

export default function TextfieldComponent(props: ITextfieldComponentProps) {
  const { className, ...restProps } = props;

  return (
    <div className={clsx("grid grid-cols-1", "gap-x-1 w-full")}>
      <label
        className={clsx("text-[0.875rem] text-charleston-green font-regular")}
        htmlFor={props.id}
      >
        {props.label}
      </label>

      <div
        className={clsx(
          "flex justify-between",
          "w-full p-4",
          "gap-4",
          "border border-gainsboro rounded-[0.625rem]"
        )}
      >
        <input
          className={clsx(
            "w-full",
            "bg-white bg-opacity-0 outline-0",
            "placeholder:text-taupe-gray placeholder:font-regular placeholder:text-[1rem]",
            className
          )}
          {...restProps}
        />
        {props.endAddornment && props.endAddornment}
      </div>
    </div>
  );
}
