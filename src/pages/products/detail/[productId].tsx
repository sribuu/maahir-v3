import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import DetailProductContainer from "@/src/features/products/containers/detail/Detail.product";
import {
  fetchMaahirMenu,
  fetchMaahirPriceCategory,
  fetchMaahirProductCategory,
  fetchMaahirSocialMedia,
} from "@/src/core/lib/api";
import { ReactQueryKey, RouterQueryKey } from "@/src/core/lib/constants";
import { fetchProductById } from "@/src/core/lib/api/dynamic";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;
  try {
    await queryClient.prefetchQuery([ReactQueryKey.GetMenu], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetSocialMedia],
      fetchMaahirSocialMedia
    );
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetProductCategory],
      fetchMaahirProductCategory
    );
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetPriceCategory],
      fetchMaahirPriceCategory
    );

    // storage
    // await queryClient.prefetchQuery([ReactQueryKey.GetCart], fetchCart);

    // DYNAMIC
    // product
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

export default function DetailProductsPage() {
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

      <DetailProductContainer />
    </>
  );
}
