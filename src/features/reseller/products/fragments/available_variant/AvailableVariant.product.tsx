import React, { useEffect, useState } from "react";
import clsx from "clsx";

export interface IAvailableVariantProductProps {
  selected?: number;
  variants?: string[];
  onSelect?: (data: number) => void;
}

AvailableVariantProduct.defaultProps = {
  variants: [],
};

export default function AvailableVariantProduct(
  props: IAvailableVariantProductProps
) {
  const [activeVariant, setActiveVariant] = useState(-1);

  const handleActiveVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveVariant(parseInt(e.currentTarget.value));
  };

  useEffect(() => {
    if (props.selected !== undefined) {
      setActiveVariant(props.selected);
    }
  }, [props.selected]);

  useEffect(() => {
    if (props.onSelect !== undefined && activeVariant !== -1) {
      props.onSelect(activeVariant);
    }
  }, [activeVariant]);
  return (
    <div
      className={clsx(
        "grid grid-cols-[auto_1fr] items-start content-start justify-start justify-items-start",
        "gap-x-[0.625rem] sm:gap-x-[1.5rem]"
      )}
    >
      <p>{"Variant:"}</p>
      <div
        className={clsx(
          "flex flex-wrap gap-x-[1rem] gap-y-[1rem] items-center justify-start"
        )}
      >
        {props.variants.map((item, index) => (
          <button
            key={index}
            className={clsx(
              "flex items-start justify-start",
              "px-[1.5rem] py-[0.25rem] border rounded-[0.5rem]",
              "hover:border-ocean-boat-blue",
              "hover:bg-ocean-boat-blue-4",
              index === activeVariant
                ? "border-ocean-boat-blue"
                : " border-gainsboro",
              index === activeVariant ? "bg-ocean-boat-blue-4" : "bg-white"
            )}
            onClick={handleActiveVariant}
            value={String(index)}
          >
            <p
              className={clsx(
                "text-[0.75rem] sm:text-[1rem]",
                "font-regular",
                "hover:text-ocean-boat-blue",
                index === activeVariant
                  ? "text-ocean-boat-blue"
                  : "text-taupe-gray"
              )}
            >
              {item}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
