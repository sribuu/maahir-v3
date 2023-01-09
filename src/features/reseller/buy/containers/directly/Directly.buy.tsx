import * as React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import NavigationIcon from "@/src/core/ui/icons/navigation/Navigation.icon";
import DirectlyListItemCardBuy from "../../fragments/directly_list_item_card/DirectlyListItemCard.buy";
import DirectlyShoppingSummaryCardBuy from "../../fragments/directly_shopping_summary_card/DirectlyShoppingSummaryCard.buy";
import { useDirectlyGetCheckout } from "../../hooks/useGetCheckout.buy";

export interface IDirectlyBuyContainerProps {}

export default function DirectlyBuyContainer(
  props: IDirectlyBuyContainerProps
) {
  useDirectlyGetCheckout();
  const router = useRouter();
  const handleRouteBack = () => {
    router.back();
  };
  const title = "Beli Langsung";
  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center box-border",
          "gap-y-[1.25rem] w-full ",
          "pt-[106px] sm:pt-[9.625rem] pb-[6.25rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-center content-start justify-items-center",
            "gap-y-2 w-full max-w-[1200px]",
            "px-[1rem] sm:px-[0rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-[auto_auto] sm:grid-cols-1 justify-start content-start justify-items-start",
              "gap-x-[0.5rem] gap-y-2 max-w-[75rem] w-full"
            )}
          >
            <button
              className={clsx("block sm:hidden")}
              onClick={handleRouteBack}
            >
              <NavigationIcon
                className={clsx(
                  "w-[1.25rem] h-[1.25rem]",
                  "fill-charleston-green"
                )}
              />
            </button>

            <h1
              className={clsx(
                "text-[1rem] sm:text-[1.75rem]",
                "font-bold",
                "text-charleston-green"
              )}
            >
              {title}
            </h1>
          </div>

          {/* body */}
          <div
            className={clsx(
              "grid gap-y-[1rem] sm:gap-y-[0rem] gap-x-[0rem] sm:gap-x-[2rem]",
              "grid-cols-1 sm:grid-cols-[1fr_352px]",
              "box-border max-w-[1200px] w-full"
            )}
          >
            {/* content */}
            <div>
              <DirectlyListItemCardBuy />
            </div>

            <DirectlyShoppingSummaryCardBuy />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
