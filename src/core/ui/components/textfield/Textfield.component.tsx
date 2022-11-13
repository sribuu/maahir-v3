import * as React from "react";
import clsx from "clsx";

export interface ITextfieldComponentProps {
  label?: string;
  placeholder?: string;
  value?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
TextfieldComponent.defaultProps = {
  label: "",
  value: "",
  placeholder: "",
};

export default function TextfieldComponent(props: ITextfieldComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return (
    <div className={clsx("grid grid-cols-1", "gap-x-1 w-full")}>
      <p className={clsx("text-[0.875rem] text-charleston-green font-regular")}>
        {props.label}
      </p>

      <input
        className={clsx(
          "w-full p-4",
          "border border-gainsboro rounded-[0.625rem]"
        )}
        value={props.value}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
