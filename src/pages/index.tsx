import Head from "next/head";
import HomeContainer from "@/src/features/home/containers/reseller/Reseller.home";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchMaahirFAQ,
  fetchMaahirHeaders,
  fetchMaahirMenu,
  fetchMaahirSocialMedia,
} from "@/src/core/lib/api";
import { PageKey, ReactQueryKey } from "../core/lib/constants";
import { IHeaders } from "@/src/core/lib/models";
import { ResellerHomeProvider } from "../features/home/contexts/Home.context";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  let isError = false;
  try {
    // static
    await queryClient.prefetchQuery([ReactQueryKey.GetMenu], fetchMaahirMenu);
    await queryClient.prefetchQuery(
      [ReactQueryKey.GetHeaders],
      fetchMaahirHeaders
    );
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

export default function HomePage({ isErrorPrefetch }) {
  const { data: headersData } = useQuery<IHeaders[]>({
    queryKey: [ReactQueryKey.GetHeaders],
    queryFn: () => fetchMaahirHeaders(),
  });

  const headerData =
    headersData !== undefined
      ? headersData.filter((item) => item.id === PageKey.Home)[0]
      : { title: "", description: "" };

  return (
    <>
      <Head>
        <title>{headerData.title}</title>
        <meta name="description" content={headerData.description} />
      </Head>

      <ResellerHomeProvider>
        <HomeContainer />
      </ResellerHomeProvider>
    </>
  );
}
