import React, { useRef, useState } from "react";
import clsx from "clsx";
import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";

export interface IDropdownComponentProps {
  label?: string;
  value?: string;
  placeholder?: string;
  lists?: string[];
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
DropdownComponent.defaultProps = {
  label: "",
  value: "",
  placeholder: "Pilih Provinsi",
  lists: ["hallo", "opsi2", "hallo", "opsi2", "hallo", "opsi2"],
};

export default function DropdownComponent(props: IDropdownComponentProps) {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen((open) => (open = !open));
  };

  const handleClickOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onSelect) {
      props.onSelect(e);
    }
    setOpen((open) => (open = !open));
  };
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div
      ref={ref}
      className={clsx("relative", "grid grid-cols-1", "gap-y-[0.75rem] w-full")}
    >
      {String(props.label).length > 0 && (
        <p
          className={clsx(
            "text-[0.875rem] font-regular",
            "text-charleston-green"
          )}
        >
          {props.label}
        </p>
      )}
      {/* dropdown */}
      <button
        className={clsx(
          "flex justify-between items-center",
          "p-4",
          "border border-gainsboro rounded-[0.625rem]"
        )}
        onClick={handleClick}
      >
        {props.value !== undefined && !props.value.length
          ? props.placeholder
          : props.value}

        <img
          src={"/icons/chevron-down.svg"}
          className={clsx(open ? "rotate-180" : "rotate-0")}
        />
      </button>

      {open && (
        <div
          className={clsx(
            "absolute",
            "top-[6.5rem] left-0 right-0 z-10 rounded-[0.625rem]",
            "bg-white",
            "border border-gainsboro",
            "max-h-[17.5rem] overflow-scroll"
          )}
        >
          {props.lists !== undefined &&
            props.lists.map((list, index) => (
              <button
                id={list}
                key={index}
                className={clsx(
                  "flex content-start items-center",
                  "bg-white",
                  "p-4 rounded-[0.625rem] max-h-[3.5rem] box-border"
                )}
                onClick={handleClickOption}
              >
                {list}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
