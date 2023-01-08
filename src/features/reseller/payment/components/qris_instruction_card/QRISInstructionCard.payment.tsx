import * as React from "react";
import clsx from "clsx";

export interface IQRISInstructionCardPaymentProps {
  title?: string;
  finishPaymentBeforeText?: string;
  expiredDate?: string;
  name?: string;
  logo?: string;
  totalBillText?: string;
  totalBill?: string;
  orderDetailText?: string;
  paymentAccount?: string;
}

QRISInstructionCardPayment.defaultProps = {
  title: "Instruksi Pembayaran",
  finishPaymentBeforeText: "Selesaikan pembayaran sebelum",
  expiredDate: "26 Oktober 2022, 14:08:00",
  name: "QRIS",
  logo: "/logo/qris.png",
  totalBillText: "Total Tagihan",
  totalBill: "Rp2.325.996",
  orderDetailText: "Detail Pesanan",
  paymentAccount:
    "https://qris.id/homepage/images/assets/pay/harga/csan-qr-a.jpg",
};

export default function QRISInstructionCardPayment(
  props: IQRISInstructionCardPaymentProps
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
          "gap-y-[1rem] p-[1.5rem] rounded-[0.75rem]",
          "border border-ocean-boat-blue",
          "bg-alice-blue"
        )}
      >
        <p className={clsx("text-[1.5rem] text-charleston-green font-bold")}>
          {props.finishPaymentBeforeText}
        </p>
        <p className={clsx("text-[1.5rem] text-tart-orange font-bold")}>
          {props.expiredDate}
        </p>
      </div>
      {/* end expired date */}

      <div className={clsx("grid grid-cols-1 gap-y-[0.75rem]", "w-full")}>
        {/* payment method */}
        <div className={clsx("flex justify-between items-center", "w-full")}>
          <p className={clsx("text-[1.25rem] text-charleston-green font-bold")}>
            {props.name}
          </p>

          <img
            src={"/logo/qris.png"}
            className={clsx("w-[3rem] h-[1rem] object-cover")}
          />
        </div>

        <div className={clsx("w-full h-[1px]", "bg-bright-gray")} />

        <div className={clsx("flex items-center justify-between", "w-full")}>
          <div>
            <p
              className={clsx("text-[0.875rem] text-independence font-regular")}
            >
              {props.totalBillText}
            </p>
            <p
              className={clsx("text-[1.25rem] text-charleston-green font-bold")}
            >
              {props.totalBill}
            </p>
          </div>

          <button
            className={clsx("text-[1rem] text-ocean-boat-blue font-medium")}
          >
            {props.orderDetailText}
          </button>
        </div>

        <div className={clsx("w-full h-[1px]", "bg-bright-gray")} />

        {/* explanation */}
        <div
          className={clsx(
            "grid grid-cols-1 place-items-center place-content-center",
            "gap-y-[0.75rem] w-full"
          )}
        >
          {/* description */}
          <img
            src={props.paymentAccount}
            className={clsx("w-[158px] h-[158px]")}
          />

          <p
            className={clsx(
              "text-[0.875rem] text-charleston-green font-regular"
            )}
          >
            {
              "Scan code QR menggunakan Handphone kamu untuk menyelesaikan pembayaran"
            }
          </p>
          {/* end description */}
        </div>
      </div>
    </div>
  );
}
