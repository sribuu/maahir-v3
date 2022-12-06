import Head from "next/head";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import HomeCartContainer from "@/src/features/cart/containers/home/Home.cart";
import {
  fetchMaahirMenu,
  fetchMaahirPriceCategory,
  fetchMaahirProductCategory,
  fetchMaahirSocialMedia,
} from "../../core/lib/api";
import { ReactQueryKey } from "../../core/lib/constants";
import { CartProvider } from "@/src/features/cart/contexts/cart/Cart.context";

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
      [ReactQueryKey.GetProductCategory],
      fetchMaahirProductCategory
    );
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetPriceCategory],
      fetchMaahirPriceCategory
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

export default function CartPage() {
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

      <CartProvider>
        <HomeCartContainer />
      </CartProvider>
    </>
  );
}
