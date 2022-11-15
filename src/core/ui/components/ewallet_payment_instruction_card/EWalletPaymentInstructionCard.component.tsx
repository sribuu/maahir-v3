import * as React from "react";
import clsx from "clsx";

export interface IEWalletPaymentInstructionCardComponentProps {
  title?: string;
  expiredDate?: string;
  name?: string;
  logo?: string;
}

EWalletPaymentInstructionCardComponent.defaultProps = {
  title: "Instruksi Pembayaran",
  expiredDate: "26 Oktober 2022, 14:08:00",
  name: "BNI Virtual Account",
  logo: "",
};

export default function EWalletPaymentInstructionCardComponent(
  props: IEWalletPaymentInstructionCardComponentProps
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
      </div>

      {/* payment expired date */}
      <div
        className={clsx(
          "grid grid-cols-1 place-items-center place-center",
          "gap-y-[1rem] p-[1.5rem] rounded-[0.75rem]",
          "border border-ocean-boat-blue",
          "bg-alice-blue"
        )}
      >
        <p className={clsx("text-[1.5rem] text-charleston-green font-bold")}>
          {"Selesaikan pembayaran sebelum"}
        </p>
        <p className={clsx("text-[1.5rem] text-tart-orange font-bold")}>
          {props.expiredDate}
        </p>
      </div>
      {/* end expired date */}

      {/* payment method */}
      <div className={clsx("flex justify-between items-center", "w-full")}>
        <p className={clsx("text-base text-charleston-green font-regular")}>
          {props.name}
        </p>

        <img src={props.logo} className={clsx("h-[1.625rem] object-cover")} />
      </div>
      {/* explanation */}
      <div className={clsx("grid grid-cols-1", "gap-y-[0.75rem] w-full")}>
        {/* description */}
        <p className={clsx("text-[0.875rem] text-independence font-regular")}>
          {
            "Mohon klik link di bawah untuk menyelesaikan pembayaran di aplikasi e-wallet anda"
          }
        </p>

        {/* end description */}

        <p className={clsx("text-[0.875rem] text-ocean-boat-blue font-bold")}>
          {"PANDUAN PEMBAYARAN"}
        </p>
      </div>
      {/* description */}
    </div>
  );
}
