import { useGetAllProducts } from "@/src/core/hooks/useGetAllProducts";
import { useGetProductById } from "@/src/core/hooks/useGetProductById";
import * as React from "react";

export interface IProductsContainerProps {}

export default function ProductsContainer(props: IProductsContainerProps) {
  const {
    isLoading: isLoadingAllProducts,
    error: errorAllProducts,
    data: allProducts,
  } = useGetAllProducts({ limit: 2, offset: 0 });
  const {
    isLoading: isLoadingProduct,
    error: errorProduct,
    data: product,
  } = useGetProductById({ id: 2 });
  return (
    <div>
      <div></div>
    </div>
  );
}
