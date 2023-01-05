import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import { fetchPaymentMethod } from "@/src/core/lib/api/dynamic";
import DetailOrderContainer from "@/src/features/orders/containers/fill_detail/FillDetail.order";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";
import { FillDetailOrderContextProvider } from "@/src/features/orders/contexts/useFillDetailContext";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
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
    title: "Maahir | Isi Detail Pesanan",
    description: "Maahir | Isi Detail Pesanan",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <FillDetailOrderContextProvider>
        <DetailOrderContainer />
      </FillDetailOrderContextProvider>
    </>
  );
}
