import * as React from "react";
import clsx from "clsx";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface ITotalShippingCostListOrderProps {
  shippingCost?: number;
}

TotalShippingCostListOrder.defaultProps = {
  serviceCost: 0,
};

export default function TotalShippingCostListOrder(
  props: ITotalShippingCostListOrderProps
) {
  const totalPayment = thousandSeparator(props.shippingCost);
  return (
    <div className={clsx("flex gap-x-[0.125rem] items-center justify-between")}>
      <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
        {"Biaya Pengiriman"}
      </p>

      <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
        {totalPayment}
      </p>
    </div>
  );
}
