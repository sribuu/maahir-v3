import { useContext } from "react";
import clsx from "clsx";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import BalanceCardBalance from "../../components/balance_card/BalanceCard.balance";
import WithdrawCardBalance from "../../components/withdraw_card/WithdrawCard.balance";
import ToastComponent from "@/src/core/ui/components/toast/Toast.component";
import { WithdrawBalanceContext } from "../../contexts/withdraw/Withdraw.context";
import { WithdrawBalanceActionEnum } from "../../contexts/withdraw/Withdraw.types";
export interface IManagementBalanceContainerProps {}

export default function ManagementBalanceContainer(
  props: IManagementBalanceContainerProps
) {
  const { state, dispatch } = useContext(WithdrawBalanceContext);
  const header = {
    name: "Kelola Saldo",
    description: "Cek dan tarik saldo kamu",
  };

  const handleCloseToast = () => {
    dispatch({
      type: WithdrawBalanceActionEnum.CloseSuccessNotification,
    });
  };

  return (
    <SupplierLayout header={header}>
      <div className={clsx("grid grid-cols-1 gap-y-[1.75rem]", "w-full")}>
        <div className={clsx("grid grid-cols-2 gap-x-[2rem]", "w-full")}>
          <BalanceCardBalance />
          <WithdrawCardBalance />
        </div>
      </div>
      <ToastComponent
        open={state.notification.open}
        error={false}
        message={"Saldo berhasil ditarik"}
        onClose={handleCloseToast}
      />
    </SupplierLayout>
  );
}
