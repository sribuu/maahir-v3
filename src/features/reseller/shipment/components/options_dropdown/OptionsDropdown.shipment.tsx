import React, { useRef, useState } from "react";
import clsx from "clsx";
import useOnClickOutside from "@/src/core/hooks/ui/useOnClickOutside";

export interface IOptionsDropdownShipmentProps {
  index?: number;
  disabled?: boolean;
  options?: {
    name: string;
    eta: string;
    price: string;
  }[];
}
OptionsDropdownShipment.defaultProps = {
  index: -1,
  disabled: true,
  options: [],
};

export default function OptionsDropdownShipment(
  props: IOptionsDropdownShipmentProps
) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [optionsButtonText, setOptionsButtonText] =
    useState("Pilih Pengiriman");

  const handleClickOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
  };
  useOnClickOutside(ref, () => setOpen(false));

  const handleSelectOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    setOptionsButtonText(e.currentTarget.value);
  };
  return (
    <div
      ref={ref}
      className={clsx(
        "relative",
        "grid grid-cols-1 items-start content-start gap-y-[0.375rem]",
        props.index === 0 ? "grid" : "hidden"
      )}
    >
      <p className={clsx("text-[0.75rem] text-charleston-green font-regular")}>
        {"Pilih Pengiriman"}
      </p>
      <button
        className={clsx(
          "flex items-center justify-center",
          "border border-ocean-boat-blue",
          "rounded-[0.75rem]",
          "px-[0.875rem] py-[0.5rem]",
          "bg-white",
          "text-[0.875rem] text-ocean-boat-blue font-bold",
          "box-border",
          "min-w-[156px]",
          props.disabled ? "opacity-40" : "opacity-100"
        )}
        disabled={props.disabled}
        onClick={handleClickOptions}
      >
        {optionsButtonText}
      </button>

      <div
        className={clsx(
          "bg-white",
          "rounded-[0.625rem]",
          "p-[0.5rem]",
          "shadow-options",
          open ? "grid" : "hidden",
          "w-full",
          "absolute top-[4.5rem]"
        )}
      >
        {props.options.length > 0 &&
          props.options.map((item, index) => (
            <div
              key={index}
              className={clsx("grid grid-cols-1 gap-y-[0.5rem]", "w-full")}
            >
              <button
                className={clsx(
                  "p-[0.5rem]",
                  "cursor-pointer",
                  "grid items-center content-center justify-start justify-items-start",
                  "bg-white hover:bg-ocean-boat-blue",
                  "opacity-100 hover:bg-opacity-5"
                )}
                value={item.name}
                onClick={handleSelectOptions}
              >
                <p
                  className={clsx(
                    "text-[1rem] text-charleston-green font-medium"
                  )}
                >
                  {item.name}
                </p>
                <p
                  className={clsx(
                    "text-[0.75rem] text-taupe-gray font-regular"
                  )}
                >
                  {item.eta}
                </p>
                <p
                  className={clsx(
                    "text-[0.75rem] text-charleston-green font-medium"
                  )}
                >
                  {item.price}
                </p>
              </button>

              <div
                className={clsx(
                  "w-full h-[1px]",
                  "bg-gainsboro",
                  index < props.options.length - 1 ? "grid" : "hidden"
                )}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
