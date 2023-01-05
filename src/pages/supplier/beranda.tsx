import * as React from "react";
import Head from "next/head";
import SupplierHomeContainer from "@/src/features/supplier/home/containers/supplier/Supplier.home";
import { SupplierHomeProvider } from "@/src/features/supplier/home/contexts/HomeSupplier.context";

export interface ISupplierHomePageProps {}

export default function SupplierHomePage(props: ISupplierHomePageProps) {
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
      <SupplierHomeProvider>
        <SupplierHomeContainer />
      </SupplierHomeProvider>
    </>
  );
}
