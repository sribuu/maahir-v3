import * as React from "react";
import clsx from "clsx";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IOrderItemListComponentProps {
  name?: string;
  quantity?: number;
  price?: number;
}
OrderItemListComponent.defaultProps = {
  name: "",
  quantity: 0,
  price: 0,
};

export default function OrderItemListComponent(
  props: IOrderItemListComponentProps
) {
  const priceItem = thousandSeparator(props.price);
  return (
    <div className={clsx("flex gap-x-[0.125rem] items-center justify-between")}>
      <div>
        <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
          {props.name}
        </p>
        <p
          className={clsx("text-[0.875rem] text-charleston-green font-regular")}
        >
          <span
            className={clsx("text-[0.875rem] text-taupe-gray font-regular")}
          >{`Qty: `}</span>
          {props.quantity}
        </p>
      </div>
      <p className={clsx("text-base text-charleston-green font-bold")}>
        {priceItem}
      </p>
    </div>
  );
}
