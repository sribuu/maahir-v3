import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import ProductOrderContainer from "@/src/features/orders/containers/product/Product.order";
import { fetchProductById } from "@/src/core/lib/api/dynamic";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
    await queryClient.prefetchQuery(["maahir-menu"], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      ["maahir-social-media"],
      fetchMaahirSocialMedia
    );

    await queryClient.prefetchQuery(["maahir-product-by-id"], () =>
      fetchProductById(context.params.id)
    );
  } catch (e) {
    isError = true;
  }

  return {
    props: {
      isErrorPrefetch: isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export interface IProductPageProps {}

export default function ProductPage(props: IProductPageProps) {
  const header = {
    title: "Maahir | Product",
    description: "Maahir Product",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <ProductOrderContainer />
    </>
  );
}
