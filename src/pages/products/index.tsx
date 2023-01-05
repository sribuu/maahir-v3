import Head from "next/head";
import ProductsContainer from "@/src/features/reseller/products/containers/home/Home.product";
import { ProductsProvider } from "@/src/features/reseller/products/contexts/products/Products.context";

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

      <ProductsProvider>
        <ProductsContainer />
      </ProductsProvider>
    </>
  );
}
