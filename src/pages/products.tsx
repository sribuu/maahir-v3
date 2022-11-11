import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import ProductsContainer from "@/src/features/products/containers/Products.container";
import { fetchMaahirMenu, fetchMaahirSocialMedia } from "../core/lib/api";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  let isError = false;
  try {
    await queryClient.prefetchQuery(["maahir-menu"], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      ["maahir-social-media"],
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
