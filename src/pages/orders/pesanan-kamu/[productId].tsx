import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import BuyNowContainer from "@/src/features/orders/containers/buy_now";
import { fetchProductById } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";
import { ResellerOrderBuyNowProvider } from "@/src/features/orders/contexts/buy_now/BuyNow.context";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
    await queryClient.prefetchQuery([ReactQueryKey.GetProductById], () =>
      fetchProductById({
        id: parseInt(String(context.query[RouterQueryKey.ProductId])),
      })
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

export interface IYourOrderPageProps {}

export default function YourOrderPage(props: IYourOrderPageProps) {
  const header = {
    title: "Maahir | Pesanan Kamu",
    description: "Maahir | Pesanan Kamu",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <ResellerOrderBuyNowProvider>
        <BuyNowContainer />
      </ResellerOrderBuyNowProvider>
    </>
  );
}
