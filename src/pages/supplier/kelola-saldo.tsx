import * as React from "react";
import Head from "next/head";
import ManagementBalanceContainer from "@/src/features/balance/containers/management/Management.balance";

export interface ISupplierBalanceManagementPageProps {}

export default function SupplierBalanceManagementPage(
  props: ISupplierBalanceManagementPageProps
) {
  const header = {
    title: "Maahir | Beranda",
    description: "Maahir Beranda",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>
      <ManagementBalanceContainer />
    </>
  );
}
