import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import { fetchOrderById, fetchPaymentMethod } from "@/src/core/lib/api/dynamic";
import FinishPaymentOrderContainer from "@/src/features/reseller/orders/containers/finish_payment/FinishPayment.order";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
    // DYNAMIC

    // payment-method
    await queryClient.prefetchQuery([ReactQueryKey.GetPaymentMethod], () =>
      fetchPaymentMethod()
    );

    await queryClient.prefetchQuery([ReactQueryKey.GetOrderByOrderCode], () =>
      fetchOrderById(String(context.query[RouterQueryKey.OrderCode]))
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

export interface IFinishPaymentOrderPageProps {}

export default function FinishPaymentOrderPage(
  props: IFinishPaymentOrderPageProps
) {
  const header = {
    title: "Maahir | Selesaikan Pembayaran",
    description: "Maahir | Selesaikan Pembayaran",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <FinishPaymentOrderContainer />
    </>
  );
}
