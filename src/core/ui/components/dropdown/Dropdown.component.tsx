import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";

export interface IDropdownComponentProps {
  label?: string;
  value?: string;
  placeholder?: string;
  lists?: string[];
  disabled?: boolean;
  defaultValue?: string;
  helperText?: string;
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
DropdownComponent.defaultProps = {
  label: "",
  value: "",
  placeholder: "Pilih Provinsi",
  disabled: false,
  defaultValue: "",
  helperText: "",
  lists: [],
  // lists: ["hallo", "opsi2", "hallo", "opsi2", "hallo", "opsi2"],
};

export default function DropdownComponent(props: IDropdownComponentProps) {
  const { disabled, label, value, placeholder, lists, onSelect, defaultValue } =
    props;
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleClickOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onSelect) {
      onSelect(e);
    }
    setOpen(!open);
  };
  useOnClickOutside(ref, () => setOpen(false));

  const selectionValue =
    value !== undefined && !value.length && defaultValue?.length > 0
      ? defaultValue
      : value !== undefined && !value.length && placeholder?.length > 0
      ? placeholder
      : value;
  return (
    <div
      ref={ref}
      className={clsx("relative", "grid grid-cols-1", "gap-y-[0.25rem] w-full")}
    >
      {String(label).length > 0 && (
        <p
          className={clsx(
            "text-[0.875rem] font-regular",
            !disabled ? "text-charleston-green" : "text-taupe-gray"
          )}
        >
          {label}
        </p>
      )}
      {/* dropdown */}

      <button
        className={clsx(
          "flex justify-between items-center",
          "p-4 w-full h-[3.5rem]",
          "box-border",
          "border border-gainsboro rounded-[0.625rem]",
          value !== undefined && !value.length && !defaultValue.length
            ? "text-taupe-gray"
            : "text-charleston-green",
          "font-regular text-[1rem]",
          !disabled ? "bg-white" : "bg-bright-gray"
        )}
        onClick={handleClick}
      >
        {selectionValue}

        <img
          src={"/icons/chevron-down.svg"}
          className={clsx(open ? "rotate-180" : "rotate-0")}
        />
      </button>

      {props.helperText !== undefined && props.helperText.length > 0 && (
        <p className={clsx("text-taupe-gray", "text-[0.75rem] font-regular")}>
          {props.helperText}
        </p>
      )}

      <div
        className={clsx(
          "absolute",
          "top-[6.5rem] left-0 right-0 z-10 rounded-[0.625rem]",
          "bg-white",
          "border border-gainsboro",
          "max-h-[17.5rem] overflow-scroll",
          open ? "inline-block" : "hidden"
        )}
      >
        {lists !== undefined &&
          lists.map((list, index) => (
            <button
              id={list}
              key={index}
              className={clsx(
                "flex content-start items-center w-full",
                "bg-white",
                "p-4 rounded-[0.625rem] max-h-[3.5rem] box-border"
              )}
              value={list}
              onClick={handleClickOption}
            >
              {list}
            </button>
          ))}
      </div>
    </div>
  );
}
