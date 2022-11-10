import Head from "next/head";
import OrdersContainer from "@/src/features/orders/containers/Orders.container";

export default function OrdersPage() {
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

      <OrdersContainer />
    </>
  );
}
