import * as React from "react";
import clsx from "clsx";
import { usePaymentMethodData } from "../../hooks/usePaymentMethod";

export interface ISelectedPaymentListOrderProps {
  name?: string;
  logo?: string;
}

SelectedPaymentListOrder.defaultProps = {
  name: "",
  logo: "",
};

export default function SelectedPaymentListOrder(
  props: ISelectedPaymentListOrderProps
) {
  return (
    <div className={clsx("flex justify-between items-center", "w-full")}>
      <p className={clsx("text-base text-charleston-green font-regular")}>
        {props.name}
      </p>

      <img src={props.logo} className={clsx("h-[1.625rem] object-cover")} />
    </div>
  );
}
