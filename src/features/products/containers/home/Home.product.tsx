import React from "react";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import FilterCardProduct from "../../fragments/filter_card/FilterCard.product";
import ProductItemListProducts from "../../fragments/product_item_list/ProductItemList.products";
export interface IHomeProductContainerProps {}

export default function HomeProductContainer(
  props: IHomeProductContainerProps
) {
  const pageContent = {
    title: "Produk jualan paling viral buat kamu",
    description:
      "Beli paket reseller di Maahir by Sribuu, dan dapatkan paket konten gratis!",
  };

  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center box-border",
          "gap-y-[4rem] w-full pt-[9.625rem] pb-[6.25rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-center content-start justify-items-center",
            "gap-y-2 w-full max-w-[1200px]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 justify-start content-start justify-items-start",
              "gap-y-2 max-w-[75rem] w-full"
            )}
          >
            <h1
              className={clsx(
                "text-[2.25rem] font-bold",
                "text-charleston-green"
              )}
            >
              {pageContent.title}
            </h1>
            <p className={clsx("text-base font-regular", "text-independence")}>
              {pageContent.description}
            </p>
          </div>
        </div>

        {/* body */}
        <div className={clsx("flex gap-[2rem]", "box-border max-w-[1200px]")}>
          <div>
            <FilterCardProduct />
          </div>

          <ProductItemListProducts />
        </div>
      </div>
    </MainLayout>
  );
}
