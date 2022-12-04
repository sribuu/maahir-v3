import * as React from "react";
import clsx from "clsx";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface ITotalPaymentListComponentProps {
  itemList?: { name: string; quantity: number; price: number }[];
  additionalCost?: number;
  shippingCost?: number;
}

TotalPaymentListComponent.defaultProps = {
  itemList: [],
  additionalCost: 0,
  shippingCost: 0,
};

export default function TotalPaymentListComponent(
  props: ITotalPaymentListComponentProps
) {
  const priceTotalItem = props.itemList.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const totalPayment = thousandSeparator(
    priceTotalItem + props.additionalCost + props.shippingCost
  );
  return (
    <div className={clsx("flex gap-x-[0.125rem] items-center justify-between")}>
      <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
        {"Total Pembayaran"}
      </p>

      <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
        {totalPayment}
      </p>
    </div>
  );
}
