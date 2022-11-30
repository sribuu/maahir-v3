import * as React from "react";
import Head from "next/head";
import ViewProductsManageProductsContainer from "@/src/features/manage_products/containers/view_product/ViewProducts.manage_products";

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
      <ViewProductsManageProductsContainer />
    </>
  );
}
