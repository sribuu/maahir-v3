import * as React from "react";
import clsx from "clsx";

export interface IPaymentMethodSummaryProps {
  title?: string;
  name?: string;
  logo?: string;
  onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

PaymentMethodSummary.defaultProps = {
  title: "Metode Pembayaran",
  name: "",
  logo: "",
};

export default function PaymentMethodSummary(
  props: IPaymentMethodSummaryProps
) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 justify-start",
        "gap-y-6 p-6 rounded-2xl w-full",
        "bg-white shadow-2"
      )}
    >
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <p className={clsx("text-base text-dark-charcoal font-bold")}>
          {props.title}
        </p>

        <button onClick={props.onEdit}>
          <p className={clsx("text-base text-ocean-boat-blue font-bold")}>
            {"UBAH DETAIL"}
          </p>
        </button>
      </div>
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <p className={clsx("text-base text-charleston-green font-regular")}>
          {props.name}
        </p>

        <img src={props.logo} className={clsx("h-[1.625rem] object-cover")} />
      </div>
    </div>
  );
}
