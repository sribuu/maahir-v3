import React, { useEffect, useState } from "react";
import clsx from "clsx";
import CheckcircleComponent from "@/src/core/ui/components/checkcircle/Checkcircle.component";

export interface IAvailabilitySelectManageProductProps {
  selected?: string;
  onChange?: (data: string) => void;
}

export default function AvailabilitySelectManageProduct(
  props: IAvailabilitySelectManageProductProps
) {
  const [selected, setSelected] = useState("");
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.name);
  };

  const list = ["Tampilkan", "Sembunyikan"];

  useEffect(() => {
    if (selected.length > 0 && props.onChange) {
      props.onChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (props.selected?.length > 0) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-y-[0.5rem] place-items-start place-content-start"
      )}
    >
      <p className={clsx("text-[0.875rem] text-charleston-green font-regular")}>
        {"Ketersediaan Produk"}
      </p>
      <div className={clsx("flex items-center justify-start gap-x-[1.5rem]")}>
        {list.map((item, index) => (
          <CheckcircleComponent
            key={index}
            name={item}
            checked={selected === item}
            onChange={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
