import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import { fetchPaymentMethod } from "@/src/core/lib/api/dynamic";
import SummaryOrderContainer from "@/src/features/orders/containers/summary/Summary.order";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";
import { FillDetailOrderContextProvider } from "@/src/features/orders/contexts/useFillDetailContext";

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

export interface IFillDetailOrderPageProps {}

export default function FillDetailOrderPage(props: IFillDetailOrderPageProps) {
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

      <FillDetailOrderContextProvider>
        <SummaryOrderContainer />
      </FillDetailOrderContextProvider>
    </>
  );
}
