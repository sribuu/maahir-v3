import * as React from "react";
import { useGetHighlightProducts } from "@/src/core/hooks/useGetHighlightProducts";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import HeroHome from "../../fragments/hero/Hero.home";
import FaqHighlightHome from "../../fragments/faq_highlight/FaqHighlight.home";
import { HomeProvider } from "../../contexts/Home.context";

export interface IHomeContainerProps {}

export default function HomeContainer(props: IHomeContainerProps) {
  return (
    <MainLayout>
      <HomeProvider>
        <HeroHome />
        <FaqHighlightHome />
      </HomeProvider>
    </MainLayout>
  );
}
