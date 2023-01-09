import Head from "next/head";
import { BuyDirectlyProvider } from "@/src/features/reseller/buy/contexts/BuyDirectly.context";
import DirectlyBuyContainer from "@/src/features/reseller/buy/containers/directly/Directly.buy";

export default function CartPage() {
  const header = {
    title: "Maahir | Beli Langsung",
    description: "Maahir Beli Langsung",
  };

  return (
    <>
      <Head>
        <title>{header.title}</title>
        <meta name="description" content={header.description} />
      </Head>

      <BuyDirectlyProvider>
        <DirectlyBuyContainer />
      </BuyDirectlyProvider>
    </>
  );
}
