import Head from "next/head";
import HomeContainer from "@/src/features/reseller/home/containers/reseller/Reseller.home";
import { resellerHeaders } from "@/src/data/reseller/static";
import { PageKey } from "../core/lib/constants";
import { ResellerHomeProvider } from "@/src/features/reseller/home/contexts/Home.context";

export default function HomePage() {
  const headerData = resellerHeaders.filter(
    (item) => item.id === PageKey.Home
  )[0];
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
