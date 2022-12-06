import { useContext } from "react";
import Link from "next/link";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import ListItemCardCart from "../../fragments/list_item_card/ListItemCard.cart";
import ShoppingSummaryCardCart from "../../fragments/shopping_summary_card/ShoppingSummary.cart";
import ButtonComponent from "@/src/core/ui/components/button/Button.component";
import { CartContext } from "../../contexts/cart/Cart.context";
import { RouterPathName } from "@/src/core/lib/constants";
export interface IHomeCartContainerProps {}

export default function HomeCartContainer(props: IHomeCartContainerProps) {
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

  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center box-border",
          "gap-y-[1.25rem] w-full pt-[9.625rem] pb-[6.25rem]",
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
                "text-[1.75rem] font-bold",
                "text-charleston-green"
              )}
            >
              {`Keranjang Kamu (${state.cart.items?.length})`}
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
