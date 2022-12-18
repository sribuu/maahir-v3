import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import ListItemCardCart from "../../fragments/list_item_card/ListItemCard.cart";
import ShoppingSummaryCardCart from "../../fragments/shopping_summary_card/ShoppingSummary.cart";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import NavigationIcon from "@/src/core/ui/icons/navigation/Navigation.icon";
import { CartContext } from "../../contexts/cart/Cart.context";
import { RouterPathName } from "@/src/core/lib/constants";
import { useHomeCartGetCartItems } from "../../hooks/useGetCartItems";
export interface IHomeCartContainerProps {}

export default function HomeCartContainer(props: IHomeCartContainerProps) {
  const query = useHomeCartGetCartItems();
  const router = useRouter();
  const { state } = useContext(CartContext);
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
              {`Keranjang Kamu (${state.cart.items?.reduce(
                (acc, item) => acc + item.amount,
                0
              )})`}
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
            <ListItemCardCart />
            <div>
              <ShoppingSummaryCardCart />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
