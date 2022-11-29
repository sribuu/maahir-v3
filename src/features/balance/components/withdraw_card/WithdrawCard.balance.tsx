import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import TextfieldComponent from "@/src/core/ui/components/textfield/Textfield.component";
import { useCheckAccountNumber } from "../../hooks/useCheckAccountNumber";
import { useGetSupplierProfileQuery } from "@/src/features/profile/hooks/useGetSupplierProfile";
import AccountNumberInformationSectionBalance from "../account_number_information_section/AccountNumberInformationSection.balance";
import NoAccountNumberInformationSectionBalance from "../no_account_number_information_section/NoAccountNumberInformationSection.balance";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import {
  useBalanceAmount,
  useMutateWithdrawBalanceQuery,
} from "../../hooks/useWithdrawBalance";

export interface IWithdrawCardBalanceProps {}

export default function WithdrawCardBalance(props: IWithdrawCardBalanceProps) {
  const { data: supplierProfileData, isLoading } = useGetSupplierProfileQuery();
  const hasAccountNumber = useCheckAccountNumber();

  const { balance, setBalance } = useBalanceAmount();

  const {
    mutate: mutateWithdrawBalance,
    isError: isErrorMutateWithdrawBalance,
  } = useMutateWithdrawBalanceQuery();

  if (isLoading) {
    return <div />;
  }

  const handleChangeBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(parseInt(e.currentTarget.value));
  };

  const handleClickWithdraw = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutateWithdrawBalance({
      balance: balance,
    });
  };

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

        <TextfieldComponent
          label={"Jumlah yang ingin ditarik"}
          onChange={handleChangeBalance}
          invalid={String(isErrorMutateWithdrawBalance)}
          helpertext={"Jumlah melebihi saldo aktif Anda"}
          defaultValue={0}
        />

        {hasAccountNumber ? (
          <AccountNumberInformationSectionBalance
            bankName={supplierProfileData?.detail.bank_name}
            accountNumber={supplierProfileData?.detail.bank_account}
            supplierName={supplierProfileData?.name}
          />
        ) : (
          <NoAccountNumberInformationSectionBalance />
        )}

        <div className={clsx("flex justify-end items-center")}>
          <ButtonComponent
            disabled={!hasAccountNumber}
            onClick={handleClickWithdraw}
          >
            {"Kirim permintaan"}
          </ButtonComponent>
        </div>
      </div>
    </CardComponent>
  );
}
