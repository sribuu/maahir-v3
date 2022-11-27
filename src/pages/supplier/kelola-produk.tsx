import * as React from "react";
import Head from "next/head";
import ManagementProductContainer from "@/src/features/products/containers/management/Management.product";

export interface ISupplierProductManagementPageProps {}

export default function SupplierProductManagementPage(
  props: ISupplierProductManagementPageProps
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
      <ManagementProductContainer />
    </>
  );
}
