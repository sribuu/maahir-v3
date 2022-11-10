import Head from "next/head";
import ProductsContainer from "@/src/features/products/containers/Products.container";

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
