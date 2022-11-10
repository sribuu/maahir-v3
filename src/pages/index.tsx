import Head from "next/head";
import HomeContainer from "@/src/features/home/containers/home/HomeContainer.home";

export default function HomePage() {
  const header = {
    title: "Maahir | Homepage",
    description: "Maahir Homepage",
  };

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
