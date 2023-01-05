import * as React from "react";
import Head from "next/head";
import EditProductManageProductsContainer from "@/src/features/supplier/products/containers/edit_product/EditProduct.manage_products";
import { EditSupplierProductProvider } from "@/src/features/supplier/products/contexts/edit/EditSupplierProduct.context";

export interface ISupplierEditProductPageProps {}

export default function SupplierEditProductPage(
  props: ISupplierEditProductPageProps
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
      <EditSupplierProductProvider>
        <EditProductManageProductsContainer />
      </EditSupplierProductProvider>
    </>
  );
}
