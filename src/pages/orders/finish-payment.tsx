import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import {
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import DetailOrderContainer from "@/src/features/orders/containers/detail/Detail.order";

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
    await queryClient.prefetchQuery(["maahir-product-by-id"], () =>
      fetchProductById(context.params.productId)
    );
    // payment-method
    await queryClient.prefetchQuery(["maahir-payment-method"], () =>
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

      <DetailOrderContainer />
    </>
  );
}
