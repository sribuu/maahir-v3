import * as React from "react";
import clsx from "clsx";

export interface IEWalletInstructionCardPaymentProps {
  title?: string;
  finishPaymentBeforeText?: string;
  expiredDate?: string;
  name?: string;
  logo?: string;
  totalBillText?: string;
  totalBill?: string;
  instructionText?: string;
  orderDetailText?: string;
  openEWalletText?: string;
}

EWalletInstructionCardPayment.defaultProps = {
  title: "Instruksi Pembayaran",
  finishPaymentBeforeText: "Selesaikan pembayaran sebelum",
  expiredDate: "26 Oktober 2022, 14:08:00",
  name: "OVO",
  totalBillText: "Total Tagihan",
  totalBill: "Rp2.325.996",
  orderDetailText: "Detail Pesanan",
  instructionText:
    "Mohon klik link di bawah untuk menyelesaikan pembayaran di aplikasi e-wallet anda",
  openEWalletText: "Buka Aplikasi E-WALLET",
  logo: "https://i0.wp.com/swanz.id/wp-content/uploads/2020/10/OVO-Logo.jpg?ssl=1",
};

export default function EWalletInstructionCardPayment(
  props: IEWalletInstructionCardPaymentProps
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
        <h3 className={clsx("text-[1rem] text-dark-charcoal font-bold")}>
          {props.title}
        </h3>
      </div>

      {/* payment expired date */}
      <div
        className={clsx(
          "grid grid-cols-1 place-items-center place-center",
          "rounded-[0.75rem]",
          "p-[0.75rem] sm:p-[1.5rem]",
          "gap-y-[0.375rem] sm:gap-y-[1rem]",
          "border border-ocean-boat-blue",
          "bg-alice-blue"
        )}
      >
        <p
          className={clsx(
            "text-[0.75rem] sm:text-[1.5rem]",
            "text-charleston-green font-bold"
          )}
        >
          {props.finishPaymentBeforeText}
        </p>
        <p
          className={clsx(
            "text-[0.875rem] sm:text-[1.5rem]",
            "text-tart-orange",
            "font-medium sm:font-bold"
          )}
        >
          {props.expiredDate}
        </p>
      </div>
      {/* end expired date */}

      <div className={clsx("grid grid-cols-1 gap-y-[0.75rem]", "w-full")}>
        {/* payment method */}
        <div className={clsx("flex justify-between items-center", "w-full")}>
          <p
            className={clsx(
              "text-[0.875rem] sm:text-[1rem]",
              "text-charleston-green font-bold"
            )}
          >
            {props.name}
          </p>

          <img
            src={props.logo}
            className={clsx("w-[3rem] h-[1rem] object-cover")}
          />
        </div>

        <div className={clsx("w-full h-[1px]", "bg-bright-gray")} />

        <div className={clsx("flex items-center justify-between", "w-full")}>
          <div>
            <p
              className={clsx(
                "text-[0.75rem] sm:text-[0.875rem]",
                "text-independence font-regular"
              )}
            >
              {props.totalBillText}
            </p>
            <p
              className={clsx(
                "text-[0.875rem] sm:text-[1.25rem]",
                "text-charleston-green font-bold"
              )}
            >
              {props.totalBill}
            </p>
          </div>

          <button
            className={clsx(
              "text-[0.875rem] sm:text-[1rem]",
              "text-ocean-boat-blue font-medium"
            )}
          >
            {props.orderDetailText}
          </button>
        </div>

        {/* explanation */}
        <div className={clsx("grid grid-cols-1", "gap-y-[0.75rem] w-full")}>
          {/* description */}
          <p
            className={clsx(
              "text-[0.75rem] sm:text-[0.875rem]",
              "text-independence font-regular"
            )}
          >
            {props.instructionText}
          </p>

          {/* end description */}

          <button
            className={clsx(
              "text-[0.75rem] sm:text-[0.875rem]",
              "text-ocean-boat-blue font-bold text-left"
            )}
          >
            {props.openEWalletText}
          </button>
        </div>
        {/* end explanation */}
      </div>
    </div>
  );
}
