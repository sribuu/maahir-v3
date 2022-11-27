import * as React from "react";
import clsx from "clsx";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import BalanceCardBalance from "../../components/balance_card/BalanceCard.balance";
import WithdrawCardBalance from "../../components/withdraw_card/WithdrawCard.balance";
export interface IManagementBalanceContainerProps {}

export default function ManagementBalanceContainer(
  props: IManagementBalanceContainerProps
) {
  const header = {
    name: "Kelola Saldo",
    description: "Cek dan tarik saldo kamu",
  };
  return (
    <SupplierLayout header={header}>
      <div className={clsx("grid grid-cols-1 gap-y-[1.75rem]", "w-full")}>
        <div className={clsx("grid grid-cols-2 gap-x-[2rem]", "w-full")}>
          <BalanceCardBalance />
          <WithdrawCardBalance />
        </div>
      </div>
    </SupplierLayout>
  );
}
