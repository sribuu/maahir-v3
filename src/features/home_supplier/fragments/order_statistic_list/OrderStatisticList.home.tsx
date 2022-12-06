import * as React from "react";
import clsx from "clsx";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IOrderStatisticListHomeProps {
  name?: string;
  quantity?: number;
  price?: number;
}

OrderStatisticListHome.defaultProps = {
  name: "",
  quantity: 0,
  price: 0,
};

export const changeOrderStatisticListColor: (name: string) => string = (
  name: string
) => {
  switch (name) {
    case "BELUM DIPROSES":
      return "tart-orange";
    case "DIKIRIM":
      return "mauve";
    case "DALAM PENGEMASAN":
      return "pastel-orange";
    case "DITERIMA":
      return "caribbean-green";
    default:
      return "";
  }
};

export const changeOrderStatisticListIcon: (name: string) => string = (
  name: string
) => {
  switch (name) {
    case "BELUM DIPROSES":
      return "/icons/unprocessed-order.svg";
    case "DIKIRIM":
      return "/icons/in-shipping.svg";
    case "DALAM PENGEMASAN":
      return "/icons/in-packaging.svg";
    case "DITERIMA":
      return "/icons/received.svg";
    default:
      return "";
  }
};

export default function OrderStatisticListHome(
  props: IOrderStatisticListHomeProps
) {
  const { name, quantity, price } = props;
  const priceFormatted = thousandSeparator(price);
  const icon = changeOrderStatisticListIcon(name);
  const color = changeOrderStatisticListColor(name);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "p-[1rem] w-full rounded-[1rem]",
        "border border-bright-gray"
      )}
    >
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <div
          className={clsx("grid grid-cols-1 justify-start gap-y-[0.125rem]")}
        >
          <p
            className={clsx(
              "text-[0.875rem] text-charleston-green font-regular"
            )}
          >
            {name}
          </p>
          <p className={clsx("text-[1rem] text-dark-charcoal font-bold")}>
            {`${quantity} pesanan`}
          </p>
          <p className={clsx("text-[0.875rem] text-taupe-gray font-medium")}>
            {priceFormatted}
          </p>
        </div>
        {/* circle */}
        <div
          className={clsx(
            "flex justify-center items-center",
            "w-[56px] h-[56px] rounded-[50%]",
            `bg-${color} bg-opacity-10`,
            "box-border"
          )}
        >
          <img src={icon} />
        </div>
      </div>
    </div>
  );
}
