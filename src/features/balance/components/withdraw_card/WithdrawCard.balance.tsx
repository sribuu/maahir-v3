import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";

export interface IWithdrawCardBalanceProps {}

export default function WithdrawCardBalance(props: IWithdrawCardBalanceProps) {
  return (
    <CardComponent className={clsx("p-[1rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 justify-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
          {"Kirim Permintaan Tarik Saldo"}
        </p>

        <TextfieldComponent label={"Jumlah yang ingin ditarik"} />

        <div
          className={clsx(
            "grid grid-cols-1 justify-start gap-y-[0.5rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[1rem] text-dark-charcoal font-medium")}>
            {"Rekening Tujuan Pengiriman"}
          </p>
          <div
            className={clsx(
              "grid grid-cols-1 justify-start gap-y-[0.25rem]",
              "w-full"
            )}
          >
            <p className={clsx("text-[1rem] text-independence font-regular")}>
              {"BCA"}
            </p>
            <p className={clsx("text-[1rem] text-dark-charcoal font-bold")}>
              {"8691640434"}
            </p>
            <p className={clsx("text-[1rem] text-independence font-regular")}>
              {"a/n Nina Nursita Ramadhan"}
            </p>
          </div>
        </div>
      </div>
    </CardComponent>
  );
}
