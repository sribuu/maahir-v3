import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  fetchMaahirDistrict,
  fetchMaahirMenu,
  fetchMaahirProvince,
  fetchMaahirSocialMedia,
} from "@/src/core/lib/api";
import {
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import DetailOrderContainer from "@/src/features/orders/containers/detail/Detail.order";
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
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetProvince],
      fetchMaahirProvince
    );
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetDistrict],
      fetchMaahirDistrict
    );

    // DYNAMIC
    // product
    await queryClient.prefetchQuery([ReactQueryKey.GetProductById], () =>
      fetchProductById(
        parseInt(String(context.query[RouterQueryKey.ProductId]))
      )
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

      <DetailOrderContainer />
    </>
  );
}
