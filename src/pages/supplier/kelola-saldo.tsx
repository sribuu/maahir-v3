import * as React from "react";
import Head from "next/head";
import ManagementBalanceContainer from "@/src/features/supplier/balance/containers/management/Management.balance";
import { WithdrawBalanceProvider } from "@/src/features/supplier/balance/contexts/withdraw/Withdraw.context";

export interface ISupplierBalanceManagementPageProps {}

export default function SupplierBalanceManagementPage(
  props: ISupplierBalanceManagementPageProps
) {
  const header = {
    title: "Maahir | Kelola Saldo",
    description: "Maahir Kelola Saldo",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>
      <WithdrawBalanceProvider>
        <ManagementBalanceContainer />
      </WithdrawBalanceProvider>
    </>
  );
}
