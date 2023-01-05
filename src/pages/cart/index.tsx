import Head from "next/head";
import HomeCartContainer from "@/src/features/reseller/cart/containers/home/Home.cart";
import { ResellerMyCartProvider } from "@/src/features/reseller/cart/contexts/my_cart/MyCart.context";

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

      <ResellerMyCartProvider>
        <HomeCartContainer />
      </ResellerMyCartProvider>
    </>
  );
}
