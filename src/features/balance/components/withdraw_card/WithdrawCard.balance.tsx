import { useContext } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import MoneyTextfieldComponent from "@/src/core/ui/components/money_textfield/MoneyTextfield.component";
import AccountNumberInformationSectionBalance from "../account_number_information_section/AccountNumberInformationSection.balance";
import NoAccountNumberInformationSectionBalance from "../no_account_number_information_section/NoAccountNumberInformationSection.balance";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { useWithdrawBalanceRequestWithdraw } from "../../hooks/useWithdrawBalance";
import { WithdrawBalanceContext } from "../../contexts/withdraw/Withdraw.context";
import { useWithdrawBalanceGetSupplierProfile } from "../../hooks/useGetSupplierProfile";
import { WithdrawBalanceActionEnum } from "../../contexts/withdraw/Withdraw.types";

export interface IWithdrawCardBalanceProps {}

export default function WithdrawCardBalance(props: IWithdrawCardBalanceProps) {
  const { isLoading: isLoadingGetSupplierProfile } =
    useWithdrawBalanceGetSupplierProfile();
  const { state, dispatch } = useContext(WithdrawBalanceContext);
  const { mutate: requestWithdrawBalance } =
    useWithdrawBalanceRequestWithdraw();

  if (isLoadingGetSupplierProfile) {
    return <div />;
  }

  const handleChangeBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: WithdrawBalanceActionEnum.InputBalance,
      payload: e.currentTarget.value,
    });
    dispatch({
      type: WithdrawBalanceActionEnum.CheckBalanceWithdrawAbility,
      payload: state.maximum_withdraw,
    });
  };

  const handleClickWithdraw = (e: React.MouseEvent<HTMLButtonElement>) => {
    requestWithdrawBalance();
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

        <MoneyTextfieldComponent
          label={"Jumlah yang ingin ditarik"}
          onChange={handleChangeBalance}
          // invalid={String(isErrorMutateWithdrawBalance)}
          value={state.withdraw_request_form.balance.value}
          invalid={String(state.withdraw_request_form.balance.error.length > 0)}
          helpertext={state.withdraw_request_form.balance.error}
        />

        {state.withdraw_request_form.has_account_number ? (
          <AccountNumberInformationSectionBalance
            bankName={state.withdraw_request_form.bank_name}
            accountNumber={state.withdraw_request_form.account_number}
            supplierName={state.withdraw_request_form.name}
          />
        ) : (
          <NoAccountNumberInformationSectionBalance />
        )}

        <div className={clsx("flex justify-end items-center")}>
          <ButtonComponent
            disabled={state.withdraw_request_form.balance.error.length > 0}
            onClick={handleClickWithdraw}
          >
            {"Kirim permintaan"}
          </ButtonComponent>
        </div>
      </div>
    </CardComponent>
  );
}
