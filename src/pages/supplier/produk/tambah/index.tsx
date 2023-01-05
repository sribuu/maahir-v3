import * as React from "react";
import Head from "next/head";
import AddProductManageProductsContainer from "@/src/features/supplier/products/containers/add_product/AddProduct.manage_products";
import { AddSupplierProductProvider } from "@/src/features/supplier/products/contexts/add/AddSupplierProduct.context";

export interface ISupplierAddProductPageProps {}

export default function SupplierAddProductPage(
  props: ISupplierAddProductPageProps
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
      <AddSupplierProductProvider>
        <AddProductManageProductsContainer />
      </AddSupplierProductProvider>
    </>
  );
}
