import Head from "next/head";
import HomeContainer from "@/src/features/home/containers/home/HomeContainer.home";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchMaahirFAQ,
  fetchMaahirMenu,
  fetchMaahirSocialMedia,
} from "../core/lib/api";
import { fetchTopThreeViralProducts } from "../core/lib/api/dynamic";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  let isError = false;
  try {
    await queryClient.prefetchQuery(["maahir-menu"], fetchMaahirMenu);
    await queryClient.prefetchQuery(["maahir-faq"], fetchMaahirFAQ);
    await queryClient.prefetchQuery(
      ["maahir-social-media"],
      fetchMaahirSocialMedia
    );
    await queryClient.prefetchQuery(
      ["maahir-top-three-viral-products"],
      fetchTopThreeViralProducts
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
  const header = {
    title: "Maahir | Homepage",
    description: "Maahir Homepage",
  };
  const { data, isLoading } = useQuery({
    queryKey: ["maahir-menu"],
    queryFn: fetchMaahirMenu,
  });
  console.log(data, isLoading, isErrorPrefetch, "ini loading getpost");
  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <HomeContainer />
    </>
  );
}
