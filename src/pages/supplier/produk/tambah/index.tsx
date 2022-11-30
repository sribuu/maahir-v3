import * as React from "react";
import Head from "next/head";
import AddProductManageProductsContainer from "@/src/features/manage_products/containers/add_product/AddProduct.manage_products";

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
      <AddProductManageProductsContainer />
    </>
  );
}
