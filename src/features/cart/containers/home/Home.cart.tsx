import * as React from "react";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import ListItemCardCart from "../../fragments/list_item_card/ListItemCard.cart";
import ShoppingSummaryCardCart from "../../fragments/shopping_summary_card/ShoppingSummary.cart";
export interface IHomeCartContainerProps {}

export default function HomeCartContainer(props: IHomeCartContainerProps) {
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
              {`Keranjang Kamu`}
            </h1>
          </div>
        </div>

        {/* body */}
        <div
          className={clsx(
            "grid grid-cols-[1fr_352px] gap-[2rem]",
            "box-border max-w-[1200px] w-full"
          )}
        >
          <ListItemCardCart />
          <ShoppingSummaryCardCart />
        </div>
      </div>
    </MainLayout>
  );
}
