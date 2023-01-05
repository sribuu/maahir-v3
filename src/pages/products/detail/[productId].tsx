import Head from "next/head";
import DetailProductContainer from "@/src/features/reseller/products/containers/detail/Detail.product";
import { ProductProvider } from "@/src/features/reseller/products/contexts/product/Product.context";

export default function DetailProductsPage() {
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
      <ProductProvider>
        <DetailProductContainer />
      </ProductProvider>
    </>
  );
}
