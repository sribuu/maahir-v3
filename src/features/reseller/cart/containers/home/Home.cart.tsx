import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import ListItemCardCart from "../../fragments/list_item_card/ListItemCard.cart";
import ShoppingSummaryCardCart from "../../fragments/shopping_summary_card/ShoppingSummary.cart";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import NavigationIcon from "@/src/core/ui/icons/navigation/Navigation.icon";
import FloatingActionBuyCart from "../../fragments/floating_action_buy/FloatingActionBuy.cart";
import { ResellerMyCartContext } from "../../contexts/my_cart/MyCart.context";
import { RouterPathName } from "@/src/core/lib/constants";
import { useMyCartGetCartItems } from "../../hooks/useGetCartItems";
import UnavailableListItemCardCart from "../../fragments/unavailable_list_item_card/UnavailableListItemCard.cart";
import InformationCircleIcon from "@/src/core/ui/icons/information_circle/InformationCircle.icon";
import { ResellerMyCartActionsEnum } from "../../contexts/my_cart/MyCart.types";
export interface IHomeCartContainerProps {}

export default function HomeCartContainer(props: IHomeCartContainerProps) {
  const query = useMyCartGetCartItems();
  const router = useRouter();
  const { state, dispatch } = useContext(ResellerMyCartContext);
  if (state.cart.is_empty) {
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
              "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]"
            )}
          >
            <img src={"/illustrations/empty-cart.svg"} />
            <div
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center gap-y-[0.75rem]"
              )}
            >
              <p
                className={clsx(
                  "text-[1.5rem] text-charleston-green font-bold"
                )}
              >
                {"Keranjangmu kosong"}
              </p>
              <p className={clsx("text-[1rem] text-independence font-regular")}>
                {"Silahkan isi dengan barang yang kamu inginkan!"}
              </p>
            </div>
          </div>

          <Link href={RouterPathName.AllProducts}>
            <ButtonComponent size={"large"}>
              {"Lihat Semua Produk"}
            </ButtonComponent>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleRouteBack = () => {
    router.back();
  };

  const handleSeeUnavailableItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: ResellerMyCartActionsEnum.ShowUnavailableItems,
    });
  };

  const quantityIsNotZero =
    state.cart.items.length + state.cart.unavailable_items.length > 0;

  const unavailableItemText = "Ada barang yang tidak bisa di proses nih";
  const seeUnavailableItemText = "Lihat Barang";

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
              {`Keranjang Kamu (${state.total_number})`}
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
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start",
                "gap-y-[36px]",
                "w-full"
              )}
            >
              {/* badge */}
              <div
                className={clsx(
                  state.cart.is_any_unavailable_items ? "flex" : "hidden",
                  "items-center justify-between",
                  "w-full",
                  "px-[18px] py-[14px]",
                  "bg-lavender-blush",
                  "border border-tart-orange",
                  "rounded-[0.75rem]"
                )}
              >
                <div
                  className={clsx(
                    "flex items-center justify-start gap-x-[0.625rem]"
                  )}
                >
                  <InformationCircleIcon
                    className={clsx("w-[1.5rem] h-[1.5rem] fill-tart-orange")}
                  />
                  <p
                    className={clsx(
                      "text-[1rem] text-charleston-green font-medium"
                    )}
                  >
                    {unavailableItemText}
                  </p>
                </div>

                <button
                  className={clsx(
                    "text-[0.875rem] text-ocean-boat-blue font-bold"
                  )}
                  onClick={handleSeeUnavailableItem}
                >
                  {seeUnavailableItemText}
                </button>
              </div>
              {/* end badge */}

              <ListItemCardCart />
              <UnavailableListItemCardCart />
            </div>

            <div className={clsx("hidden sm:block")}>
              <ShoppingSummaryCardCart />
            </div>
            <div
              className={clsx(quantityIsNotZero ? "grid sm:hidden" : "hidden")}
            >
              <FloatingActionBuyCart />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
