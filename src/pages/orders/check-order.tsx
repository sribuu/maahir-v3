import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";

import SearchOrderContainer from "@/src/features/orders/containers/search/Search.order";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
    // STATIC
    await queryClient.prefetchQuery(["maahir-menu"], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      ["maahir-social-media"],
      fetchMaahirSocialMedia
    );

    // DYNAMIC
    // product
    // await queryClient.prefetchQuery(["maahir-product-by-id"], () =>
    //   fetchProductById(context.params.productId)
    // );
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

export interface IOrderPageProps {}

export default function OrderPage(props: IOrderPageProps) {
  const header = {
    title: "Maahir | Cek Order Kamu",
    description: "Maahir | Cek Order Kamu",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <SearchOrderContainer />
    </>
  );
}
