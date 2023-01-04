import * as React from "react";
import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  fetchMaahirFAQ,
  fetchMaahirMenu,
  fetchMaahirSocialMedia,
} from "@/src/core/lib/api";
import {
  fetchPaymentMethod,
  fetchProductById,
} from "@/src/core/lib/api/dynamic";
import FAQContainer from "@/src/features/faq/containers/FAQ.container";
import { ReactQueryKey } from "@/src/core/lib/constants";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;

  try {
    // STATIC
    await queryClient.prefetchQuery([ReactQueryKey.GetMenu], fetchMaahirMenu);
    await queryClient.prefetchQuery([ReactQueryKey.GetFAQ], fetchMaahirFAQ);
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetSocialMedia],
      fetchMaahirSocialMedia
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

export interface IFAQPageProps {}

export default function FAQPage(props: IFAQPageProps) {
  const header = {
    title: "Maahir | FAQ",
    description: "Maahir | FAQ",
  };
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <FAQContainer />
    </>
  );
}
