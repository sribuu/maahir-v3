import * as React from "react";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import HeadlineProducts from "../fragments/headline/Headline.products";
import SectionListProducts from "../fragments/section_list/SectionList.products";
export interface IProductsContainerProps {}

export default function ProductsContainer(props: IProductsContainerProps) {
  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center",
          "gap-y-[4rem] w-full pt-[9.625rem] pb-[6.25rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <HeadlineProducts />
        <SectionListProducts />
      </div>
    </MainLayout>
  );
}
