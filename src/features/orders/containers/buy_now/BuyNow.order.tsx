import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import BuyNowItemCardOrder from "@/src/features/orders/fragments/buy_now_item_card/BuyNowItemCard.order";
import ShoppingSummaryCardOrder from "@/src/features/orders/fragments/shopping_summary_card/ShoppingSummaryCard.order";
import { fetchProductById } from "@/src/core/lib/api/dynamic";
import { IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { v4 as uuid } from "uuid";
import {
  PRODUCT_LINK,
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";
import {
  useMutateOrderProduct,
  useRemoveOrderItem,
} from "../../hooks/useOrderItem";
// import { useShoppingSummary } from "../../hooks/useBuyNowState";
import { ResellerOrderBuyNowContext } from "../../contexts/buy_now/BuyNow.context";
import { useBuyNowGetProductById } from "../../hooks/useGetProductById";
import { ResellerOrderBuyNowActionEnum } from "../../contexts/buy_now/BuyNow.types";
import { useBuyNowSaveOrderProcess } from "../../hooks/usePostSaveOrderProcess";

export interface IBuyNowContainerProps {}

export default function BuyNowContainer(props: IBuyNowContainerProps) {
  const { isLoading: isLoadingGetProductById } = useBuyNowGetProductById();
  const { mutate: saveOrderProcess } = useBuyNowSaveOrderProcess();
  const { state, dispatch } = useContext(ResellerOrderBuyNowContext);

  if (isLoadingGetProductById) {
    return <div></div>;
  }
  // old
  const router = useRouter();

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
  const handleChangeNotes = (data: string) => {
    dispatch({
      type: ResellerOrderBuyNowActionEnum.SetItemNotes,
      payload: data,
    });
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
            "gap-y-[1.5rem] max-w-[1200px] w-full"
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
              "grid grid-cols-[1fr_352px] gap-[2rem]",
              "box-border max-w-[1200px] w-full"
            )}
          >
            <div>
              <BuyNowItemCardOrder
                name={state.item.name}
                productSrc={state.item.image}
                price={state.item.price}
                quantity={state.item.quantity}
                notes={state.item.notes}
                onSubstract={handleSubstract}
                onAdd={handleAdd}
                onChangeNotes={handleChangeNotes}
              />
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
