import * as React from "react";
import clsx from "clsx";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface ITotalPriceListComponentProps {
  itemList?: { name: string; quantity: number; price: number }[];
}
TotalPriceListComponent.defaultProps = {
  itemList: [],
};

export default function TotalPriceListComponent(
  props: ITotalPriceListComponentProps
) {
  const totalQuantity = props.itemList.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const formattedTotalQuantity =
    totalQuantity > 1 ? `${totalQuantity} items` : `${totalQuantity} item`;

  const totalPrice = props.itemList.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const totalPriceFormatted = thousandSeparator(totalPrice);

  return (
    <div className={clsx("flex gap-x-[0.125rem] items-center justify-between")}>
      <div>
        <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
          {"Total Harga"}
        </p>
        <p className={clsx("text-[0.75rem] text-independence font-regular")}>
          {formattedTotalQuantity}
        </p>
      </div>
      <p className={clsx("text-base text-charleston-green font-bold")}>
        {totalPriceFormatted}
      </p>
    </div>
  );
}
