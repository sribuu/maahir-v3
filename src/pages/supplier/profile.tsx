import * as React from "react";
import Head from "next/head";
import ManagementProfileContainer from "@/src/features/profile/containers/management/Management.profile";

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
      <ManagementProfileContainer />
    </>
  );
}