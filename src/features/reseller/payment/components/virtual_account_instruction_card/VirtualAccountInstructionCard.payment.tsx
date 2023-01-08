import React, { useState } from "react";
import clsx from "clsx";
import VirtualAccountInstructionModalPayment from "../virtual_account_instruction_modal/VirtualAccountInstructionModal.payment";

export interface IVirtualAccountInstructionCardPaymentProps {
  title?: string;
  finishPaymentBeforeText?: string;
  virtualAccountNumberText?: string;
  expiredDate?: string;
  name?: string;
  totalBillText?: string;
  copyText?: string;
  paymentInstructionText?: string;
  logo?: string;
  paymentAccount?: string;
  totalBillFormatted?: string;
  totalBill?: string;
  paymentOptions?: string[];
  paymentGuide?: {
    step: number;
    instruction: string;
    highlight: string[];
  }[];
}
VirtualAccountInstructionCardPayment.defaultProps = {
  title: "Instruksi Pembayaran",
  finishPaymentBeforeText: "Selesaikan pembayaran sebelum",
  virtualAccountNumberText: "Nomor Virtual Account",
  expiredDate: "26 Oktober 2022, 14:08:00",
  name: "BNI Virtual Account",
  totalBillText: "Total Tagihan",
  copyText: "Salin",
  paymentInstructionText: "PANDUAN PEMBAYARAN",
  logo: "https://dip.fisip.unair.ac.id/wp-content/uploads/2021/08/bni.jpg",
  paymentAccount: "3339998111773208",
  totalBillFormatted: "Rp.53.999",
  totalBill: "53999",
};

export default function VirtualAccountInstructionCardPayment(
  props: IVirtualAccountInstructionCardPaymentProps
) {
  const [open, setOpen] = useState(false);

  const handleClickCopyPaymentAccount = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    navigator.clipboard.writeText(props.paymentAccount);
  };
  const handleClickCopyTotalPrice = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    navigator.clipboard.writeText(String(props.totalBill));
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
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
        <h3 className={clsx("text-base text-dark-charcoal font-bold")}>
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
              className={clsx(
                "text-[0.75rem] sm:text-[0.875rem]",
                "text-independence font-regular"
              )}
            >
              {props.virtualAccountNumberText}
            </p>
            <p
              className={clsx(
                "text-[0.875rem] sm:text-[1.25rem]",
                "text-charleston-green font-bold"
              )}
            >
              {props.paymentAccount}
            </p>
          </div>

          <button
            className={clsx("flex justify-end items-center", "gap-x-4")}
            onClick={handleClickCopyPaymentAccount}
          >
            <p
              className={clsx(
                "text-[0.875rem] sm:text-[1rem]",
                "text-ocean-boat-blue font-medium"
              )}
            >
              {props.copyText}
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
              {props.totalBillFormatted}
            </p>
          </div>

          <button
            className={clsx("flex justify-end items-center", "gap-x-4")}
            onClick={handleClickCopyTotalPrice}
          >
            <p
              className={clsx(
                "text-[0.75rem] sm:text-[1rem]",
                "text-ocean-boat-blue font-medium"
              )}
            >
              {props.copyText}
            </p>
            <img
              src={"/icons/document-copy.svg"}
              className={clsx("w-[1.5rem] h-[1.5rem]")}
            />
          </button>
        </div>

        {/* end lists2 */}

        <button
          className={clsx(
            "text-[0.875rem] text-ocean-boat-blue font-bold text-left"
          )}
          onClick={handleOpenModal}
        >
          {props.paymentInstructionText}
        </button>
      </div>
      {/* payment guide */}

      <VirtualAccountInstructionModalPayment
        open={open}
        paymentGuide={props.paymentGuide}
        onClose={handleCloseModal}
      />
    </div>
  );
}
