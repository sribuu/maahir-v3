import React from "react";
import Link from "next/link";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import FilterCardProduct from "../../fragments/filter_card/FilterCard.product";
import ProductItemListProducts from "../../fragments/product_item_list/ProductItemList.products";
import NavigationIcon from "@/src/core/ui/icons/navigation/Navigation.icon";
import { RouterPathName } from "@/src/core/lib/constants";
import FilterDrawerProduct from "../../fragments/filter_drawer/FilterDrawer.product";
import ProductInfinityScrollItemListProducts from "../../fragments/product_infinity_scroll_item_list";
import SearchProducts from "../../fragments/search/Search.products";

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
          "gap-y-[1rem] sm:gap-y-[4rem]",
          "pt-[5rem] sm:pt-[9.625rem] pb-[6.25rem]",
          "w-full",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        {/* tools */}
        <div
          className={clsx(
            "flex sm:hidden",
            "items-center justify-between",
            "px-[1rem] sm:px-[0rem]",
            "w-full"
          )}
        >
          <div
            className={clsx("flex items-center justify-start gap-x-[0.625rem]")}
          >
            <Link href={RouterPathName.Home}>
              <NavigationIcon
                className={clsx("w-[1.5rem] h-[1.5rem]", "fill-cetacean-blue")}
              />
            </Link>

            <h1 className={clsx("text-[1rem] text-charleston-green font-bold")}>
              {"Produk"}
            </h1>
          </div>

          <div>
            <FilterDrawerProduct />
          </div>
        </div>

        {/* header */}
        <div
          className={clsx(
            "px-[1rem] sm:px-[0rem]",
            "grid grid-cols-[auto_auto] justify-between content-start justify-items-start items-center",
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
                "text-[1.25rem] sm:text-[2.25rem]",
                "font-bold",
                "text-charleston-green"
              )}
            >
              {pageContent.title}
            </h1>
            <p
              className={clsx(
                "text-[0.75rem] sm:text-[1rem]",
                "font-regular",
                "text-independence"
              )}
            >
              {pageContent.description}
            </p>
          </div>
          <SearchProducts />
        </div>

        {/* body */}
        <div
          className={clsx(
            "flex gap-[2rem]",
            "box-border max-w-[1200px]",
            "px-[1rem] sm:px-[0rem]"
          )}
        >
          <div className={clsx("hidden sm:block")}>
            <FilterCardProduct />
          </div>

          <div className={clsx("hidden sm:grid", "grid-cols-1", "w-full")}>
            <ProductItemListProducts />
          </div>

          <div className={clsx("grid sm:hidden", "grid-cols-1", "w-full")}>
            <ProductInfinityScrollItemListProducts />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
