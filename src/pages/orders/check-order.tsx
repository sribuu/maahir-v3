import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";

import SearchOrderContainer from "@/src/features/orders/containers/search/Search.order";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";
import { fetchOrderById } from "@/src/core/lib/api/dynamic";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
    // STATIC
    await queryClient.prefetchQuery([ReactQueryKey.GetMenu], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetSocialMedia],
      fetchMaahirSocialMedia
    );
    if (context.query[RouterQueryKey.OrderCode] !== undefined) {
      await queryClient.prefetchQuery([ReactQueryKey.GetOrderByOrderCode], () =>
        fetchOrderById(String(context.query[RouterQueryKey.OrderCode]))
      );
    }
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
