import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import {
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import PaymentSummaryOrder from "@/src/features/orders/containers/payment_summary/PaymentSummary.order";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";

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

    // DYNAMIC
    // product
    await queryClient.prefetchQuery([ReactQueryKey.GetProductById], () =>
      fetchProductById({
        id: parseInt(String(context.query[RouterQueryKey.ProductId])),
      })
    );
    // payment-method
    await queryClient.prefetchQuery([ReactQueryKey.GetPaymentMethod], () =>
      fetchPaymentMethod()
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

export interface ISummaryOrderPageProps {}

export default function SummaryOrderPage(props: ISummaryOrderPageProps) {
  const header = {
    title: "Maahir | Ringkasan Pesanan",
    description: "Maahir | Ringkasan Pesanan",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <PaymentSummaryOrder />
    </>
  );
}
