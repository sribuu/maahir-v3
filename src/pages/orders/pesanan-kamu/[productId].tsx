import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import ProductOrderContainer from "@/src/features/orders/containers/product/Product.order";
import { fetchProductById } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
    await queryClient.prefetchQuery([ReactQueryKey.GetMenu], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetSocialMedia],
      fetchMaahirSocialMedia
    );

    await queryClient.prefetchQuery([ReactQueryKey.GetProductById], () =>
      fetchProductById(
        parseInt(String(context.query[RouterQueryKey.ProductId]))
      )
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

      <ProductOrderContainer />
    </>
  );
}