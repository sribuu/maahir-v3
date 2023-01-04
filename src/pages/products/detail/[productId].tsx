import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import DetailProductContainer from "@/src/features/products/containers/detail/Detail.product";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "@/src/core/lib/api";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { ProductProvider } from "@/src/features/products/contexts/product/Product.context";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let isError = false;
  try {
    await queryClient.prefetchQuery([ReactQueryKey.GetMenu], fetchMaahirMenu);
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
      <ProductProvider>
        <DetailProductContainer />
      </ProductProvider>
    </>
  );
}
