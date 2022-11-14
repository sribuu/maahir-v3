import * as React from "react";
import clsx from "clsx";

export interface IDeliveryAddressListComponentProps {
  label?: string;
  value?: string;
}

DeliveryAddressListComponent.defaultProps = {
  label: "",
  value: "",
};

export default function DeliveryAddressListComponent(
  props: IDeliveryAddressListComponentProps
) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "gap-y-[0.125rem] w-full"
      )}
    >
      <p className={clsx("text-[0.875rem] font-regular", "text-independence")}>
        {props.label}
      </p>

      <p className={clsx("text-[1.25rem] font-bold", "text-charleston-green")}>
        {props.value}
      </p>
    </div>
  );
}
