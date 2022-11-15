import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";

import SearchOrderContainer from "@/src/features/orders/containers/search/Search.order";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";
import { fetchOrderById } from "@/src/core/lib/api/dynamic";
import { NextPageContext } from "next";

// export async function getStaticProps() {
export async function getServerSideProps(context: NextPageContext) {
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
      await queryClient.prefetchQuery(
        ['teuing'],
        () => fetchOrderById(String(context.query[RouterQueryKey.OrderCode])),
        {
          staleTime: 0,
          cacheTime: 0,
        }
      );
    }
  } catch (e) {
    console.log(e,'error prefetch')
    isError = true;
    // throw e;
  }
  console.log(isError, "ini error prefetch");
  return {
    props: {
      isErrorPrefetch: isError,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
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
