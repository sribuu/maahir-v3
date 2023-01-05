import * as React from "react";
import clsx from "clsx";

export interface IAccountNumberInformationSectionBalanceProps {
  bankName: string;
  accountNumber: string;
  supplierName: string;
}
AccountNumberInformationSectionBalance.defaultProps = {
  bankName: "BCA",
  accountNumber: "8691640434",
  supplierName: "Nina Nursita Ramadhan",
};

export default function AccountNumberInformationSectionBalance(
  props: IAccountNumberInformationSectionBalanceProps
) {
  const { bankName, accountNumber, supplierName } = props;
  const supplierNameFormatted = `a/n ${supplierName}`;
  return (
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
          {bankName}
        </p>
        <p className={clsx("text-[1rem] text-dark-charcoal font-bold")}>
          {accountNumber}
        </p>
        <p className={clsx("text-[1rem] text-independence font-regular")}>
          {supplierNameFormatted}
        </p>
      </div>
    </div>
  );
}
