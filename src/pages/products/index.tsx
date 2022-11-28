import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ProductsContainer from "@/src/features/products/containers/home/Home.product";
import {
  fetchMaahirMenu,
  fetchMaahirPriceCategory,
  fetchMaahirProductCategory,
  fetchMaahirSocialMedia,
} from "../../core/lib/api";
import { ReactQueryKey } from "../../core/lib/constants";
import { fetchProductCategoryList } from "@/src/core/lib/api/dynamic";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  let isError = false;
  try {
    await queryClient.prefetchQuery([ReactQueryKey.GetMenu], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetSocialMedia],
      fetchMaahirSocialMedia
    );
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetPriceCategory],
      fetchMaahirPriceCategory
    );

    // DYNAMIC
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetProductCategory],
      fetchProductCategoryList
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

export default function ProductsPage() {
  const header = {
    title: "Maahir | Products",
    description: "Maahir Products",
  };

  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <ProductsContainer />
    </>
  );
}
