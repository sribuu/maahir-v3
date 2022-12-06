import * as React from "react";
import clsx from "clsx";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface ITotalServiceCostListOrderProps {
  serviceCost?: number;
}

TotalServiceCostListOrder.defaultProps = {
  serviceCost: 0,
};

export default function TotalServiceCostListOrder(
  props: ITotalServiceCostListOrderProps
) {
  const totalPayment = thousandSeparator(props.serviceCost);
  return (
    <div className={clsx("flex gap-x-[0.125rem] items-center justify-between")}>
      <p className={clsx("text-[1rem] text-charleston-green font-regular")}>
        {"Biaya Penanganan"}
      </p>

      <p className={clsx("text-[1rem] text-charleston-green font-bold")}>
        {totalPayment}
      </p>
    </div>
  );
}
