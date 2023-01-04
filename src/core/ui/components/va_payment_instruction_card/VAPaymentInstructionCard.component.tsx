import * as React from "react";
import clsx from "clsx";

export interface IVAPaymentInstructionCardComponentProps {
  title?: string;
  expiredDate?: string;
  name?: string;
  logo?: string;
  paymentAccount?: string;
  totalPriceFormatted?: string;
  totalPrice?: number;
}
VAPaymentInstructionCardComponent.defaultProps = {
  title: "Instruksi Pembayaran",
  expiredDate: "26 Oktober 2022, 14:08:00",
  name: "BNI Virtual Account",
  logo: "",
  paymentAccount: "3339998111773208",
  totalPriceFormatted: "Rp.53.999",
  totalPrice: 0,
};

export default function VAPaymentInstructionCardComponent(
  props: IVAPaymentInstructionCardComponentProps
) {
  const handleClickCopyPaymentAccount = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    navigator.clipboard.writeText(props.paymentAccount);
  };
  const handleClickCopyTotalPrice = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    navigator.clipboard.writeText(String(props.totalPrice));
  };
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
      {/* lists */}
      <div className={clsx("grid grid-cols-1", "gap-y-[0.75rem] w-full")}>
        {/* list 1 */}
        <div
          className={clsx(
            "flex justify-between items-center",
            "gap-x-[1rem] w-full"
          )}
        >
          <div className={clsx("grid grid-cols-1", "gap-y-2")}>
            <p
              className={clsx("text-[0.875rem] text-independence font-regular")}
            >
              {"Nomor Virtual Account"}
            </p>
            <p
              className={clsx("text-[1.25rem] text-charleston-green font-bold")}
            >
              {props.paymentAccount}
            </p>
          </div>

          <button
            className={clsx("flex justify-end items-center", "gap-x-4")}
            onClick={handleClickCopyPaymentAccount}
          >
            <p className={clsx("text-[1rem] text-ocean-boat-blue font-medium")}>
              {"Salin"}
            </p>
            <img
              src={"/icons/document-copy.svg"}
              className={clsx("w-[1.5rem] h-[1.5rem]")}
            />
          </button>
        </div>
        {/* lists 2 */}
        <div
          className={clsx(
            "flex justify-between items-center",
            "gap-x-[1rem] w-full"
          )}
        >
          <div className={clsx("grid grid-cols-1", "gap-y-2")}>
            <p
              className={clsx("text-[0.875rem] text-independence font-regular")}
            >
              {"Total Tagihan"}
            </p>
            <p
              className={clsx("text-[1.25rem] text-charleston-green font-bold")}
            >
              {props.totalPriceFormatted}
            </p>
          </div>

          <button
            className={clsx("flex justify-end items-center", "gap-x-4")}
            onClick={handleClickCopyTotalPrice}
          >
            <p className={clsx("text-[1rem] text-ocean-boat-blue font-medium")}>
              {"Salin"}
            </p>
            <img
              src={"/icons/document-copy.svg"}
              className={clsx("w-[1.5rem] h-[1.5rem]")}
            />
          </button>
        </div>

        {/* end lists2 */}

        <p className={clsx("text-[0.875rem] text-ocean-boat-blue font-bold")}>
          {"PANDUAN PEMBAYARAN"}
        </p>
      </div>
      {/* payment guide */}
    </div>
  );
}
