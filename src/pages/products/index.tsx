import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ProductsContainer from "@/src/features/products/containers/home/Home.product";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "../../core/lib/api";
import { ReactQueryKey } from "../../core/lib/constants";
import {
  fetchProductGetPriceCategory,
  fetchProductGetProductCategory,
} from "@/src/features/products/services";
import { ProductReactQueryKey } from "@/src/features/products/constants";

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
      [ProductReactQueryKey.GetPriceCategory],
      fetchProductGetPriceCategory
    );

    // DYNAMIC
    await queryClient.prefetchQuery(
      [ProductReactQueryKey.GetProductCategory],
      fetchProductGetProductCategory
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
