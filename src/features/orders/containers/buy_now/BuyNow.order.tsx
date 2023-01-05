import React, { useContext } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import MainLayout from "@/src/core/ui/layouts/reseller/main/Main.layout";
import BuyNowItemCardOrder from "@/src/features/orders/fragments/buy_now_item_card/BuyNowItemCard.order";
import ShoppingSummaryCardOrder from "@/src/features/orders/fragments/shopping_summary_card/ShoppingSummaryCard.order";
import { RouterPathName } from "@/src/core/lib/constants";
import { ResellerOrderBuyNowContext } from "../../contexts/buy_now/BuyNow.context";
import { useBuyNowGetProductById } from "../../hooks/useGetProductById";
import { ResellerOrderBuyNowActionEnum } from "../../contexts/buy_now/BuyNow.types";
import { useBuyNowSaveOrderProcess } from "../../hooks/usePostSaveOrderProcess";
import { useResellerCheckoutGetCheckoutItems } from "../../hooks/useGetCheckoutItems";

export interface IBuyNowContainerProps {}

export default function BuyNowContainer(props: IBuyNowContainerProps) {
  const { isLoading: isLoadingGetProductById } = useBuyNowGetProductById();
  const { isLoading: isLoadingGetCheckoutItems } =
    useResellerCheckoutGetCheckoutItems();
  const { mutate: saveOrderProcess } = useBuyNowSaveOrderProcess();
  const { state, dispatch } = useContext(ResellerOrderBuyNowContext);
  const router = useRouter();

  if (isLoadingGetProductById) {
    return <div></div>;
  }

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(RouterPathName.AllProducts);
  };

  const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    saveOrderProcess();
  };

  const handleSubstract = (data: number) => {
    dispatch({
      type: ResellerOrderBuyNowActionEnum.SetItemQuantity,
      payload: data,
    });
    dispatch({
      type: ResellerOrderBuyNowActionEnum.SetSummaryQuantity,
      payload: {
        price: state.price,
        quantity: data,
      },
    });
  };

  const handleAdd = (data: number) => {
    dispatch({
      type: ResellerOrderBuyNowActionEnum.SetItemQuantity,
      payload: data,
    });
    dispatch({
      type: ResellerOrderBuyNowActionEnum.SetSummaryQuantity,
      payload: {
        price: state.price,
        quantity: data,
      },
    });
  };

  const handleSaveNotes = (data: { id: number; value: string }) => {
    // dispatch({
    //   type: ResellerOrderBuyNowActionEnum.SetItemNotes,
    //   payload: data,
    // });
  };

  return (
    <MainLayout>
      <div
        className={clsx(
          "grid grid-cols-1 justify-center content-start justify-items-center",
          "gap-y-[1.5rem] w-full pt-[8.875rem] pb-[10rem]",
          "bg-gradient-to-r from-white to-mint-cream"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 justify-start content-start justify-items-start items-start",
            "gap-y-[1.5rem] max-w-[1200px] w-full",
            "px-[1rem] sm:px-[0rem]"
          )}
        >
          <p
            className={clsx(
              "text-[1.75rem] font-bold",
              "text-charleston-green"
            )}
          >
            {"Beli Langsung"}
          </p>

          <div
            className={clsx(
              "grid gap-[2rem]",
              "grid-cols-1 sm:grid-cols-[1fr_352px]",
              "box-border max-w-[1200px] w-full"
            )}
          >
            <div>
              {state.item.map((item) => (
                <BuyNowItemCardOrder
                  // name={item.name}
                  // productSrc={item.image}
                  // price={item.price}
                  // quantity={item.quantity}
                  // note={item.notes}
                  onSubstract={handleSubstract}
                  onAdd={handleAdd}
                  onSaveNote={handleSaveNotes}
                />
              ))}
            </div>

            <ShoppingSummaryCardOrder
              quantity={state.summary.quantity}
              subTotalPrice={state.summary.sub_total_price}
              totalPrice={state.summary.total_price}
              onCancel={handleClickCancel}
              onSubmit={handleClickSubmit}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
