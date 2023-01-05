import * as React from "react";
import Head from "next/head";
import ViewProductsManageProductsContainer from "@/src/features/supplier/products/containers/view_product/ViewProducts.manage_products";
import { ViewSupplierProductProvider } from "@/src/features/supplier/products/contexts/view/ViewSupplierProduct.context";

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
      <ViewSupplierProductProvider>
        <ViewProductsManageProductsContainer />
      </ViewSupplierProductProvider>
    </>
  );
}
