import * as React from "react";
import { useGetHighlightProducts } from "@/src/core/hooks/useGetHighlightProducts";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import HeroHome from "../../fragments/hero/Hero.home";
import ProductHighlightHome from "../../fragments/product_highlight/ProductHighlight.home";
import { AppProvider } from "../../contexts/Home.context";

export interface IHomeContainerProps {}

export default function HomeContainer(props: IHomeContainerProps) {
  const {
    isLoading: isLoadingHighlightProducts,
    error: errorHighlightProducts,
    data: highlightProducts,
  } = useGetHighlightProducts();
  
  return (
    <MainLayout>
      <AppProvider>
        <HeroHome />
        <ProductHighlightHome />
      </AppProvider>
    </MainLayout>
  );
}
