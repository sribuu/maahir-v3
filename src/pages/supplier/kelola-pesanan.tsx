import * as React from "react";
import Head from "next/head";
import ManagementOrderContainer from "@/src/features/orders/containers/management/Management.order";

export interface ISupplierOrderManagementPageProps {}

export default function SupplierOrderManagementPage(
  props: ISupplierOrderManagementPageProps
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
      <ManagementOrderContainer />
    </>
  );
}
