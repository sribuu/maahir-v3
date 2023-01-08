import React, { useState } from "react";
import clsx from "clsx";

export interface IVirtualAccountInstructionTabPaymentProps {
  paymentOptions?: string[];
  paymentGuide?: {
    step: number;
    instruction: string;
    highlight: string[];
  }[];
}
VirtualAccountInstructionTabPayment.defaultProps = {
  paymentOptions: ["ATM Mandiri", "Livin Mandiri", "Internet Banking Mandiri"],
  paymentGuide: [
    {
      step: 1,
      instruction: "Masukkan kartu ATM dan PIN ATM.",
      highlight: [],
    },
    {
      step: 2,
      instruction: "Pilih menu Bayar/Beli.",
      highlight: [],
    },
    {
      step: 3,
      instruction: "Pilih opsi Lainnya",
      highlight: [],
    },
    {
      step: 4,
      instruction: "Pilih opsi Multipayment.",
      highlight: ["“KE REK. BCA VIRTUAL ACCOUNT“"],
    },
    {
      step: 5,
      instruction: "Masukkan nomor Virtual account",
      highlight: [],
    },
    {
      step: 6,
      instruction: "Klik Benar.",
      highlight: [],
    },
    {
      step: 7,
      instruction: "Layar akan menampilkan konfirmasi. Jika sesuai, pilih Ya.",
      highlight: [],
    },
    {
      step: 8,
      instruction: "Simpan bukti transaksi sebagai bukti pembayaran",
      highlight: [],
    },
  ],
};

export default function VirtualAccountInstructionTabPayment(
  props: IVirtualAccountInstructionTabPaymentProps
) {
  const [active, setActive] = useState("ATM Mandiri");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(e.currentTarget.value);
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-y-[1.5rem] place-content-start place-items-start",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-start",
          "gap-x-[46px]",
          "w-full",
          "border-b border-b-gainsboro"
        )}
      >
        {props.paymentOptions.map((item, index) => (
          <button
            key={index}
            className={clsx("pt-[0.25rem] pb-[1rem]", "relative")}
            onClick={handleClick}
            value={item}
          >
            <p
              className={clsx(
                "text-[0.875rem]",
                active === item
                  ? "text-ocean-boat-blue font-bold"
                  : "text-taupe-gray font-medium"
              )}
            >
              {item}
            </p>

            <div
              className={clsx(
                "absolute",
                "bottom-0",
                "z-10",
                "w-full h-[2.5px]",
                "bg-ocean-boat-blue",

                active === item ? "opacity-100" : "opacity-0"
              )}
            />
          </button>
        ))}
      </div>

      {/* list */}
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[0.5rem] place-content-start place-items-start",
          "w-full"
        )}
      >
        {props.paymentGuide.map((item) => (
          <div
            className={clsx("flex items-center justify-start gap-x-[0.25rem]")}
          >
            <p
              className={clsx("text-[0.875rem] text-independence font-regular")}
            >
              {`${item.step}.`}
            </p>
            <p
              className={clsx("text-[0.875rem] text-independence font-regular")}
            >
              {item.instruction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
