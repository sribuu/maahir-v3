import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import BuyNowItemCardOrder from "@/src/features/orders/fragments/buy_now_item_card/BuyNowItemCard.order";
import ShoppingSummaryCardOrder from "@/src/features/orders/fragments/shopping_summary_card/ShoppingSummaryCard.order";
import { fetchProductById } from "@/src/core/lib/api/dynamic";
import { IProducts } from "@/src/core/lib/models";
import { thousandSeparator } from "@/src/core/utils/formatters";
import {
  PRODUCT_LINK,
  ReactQueryKey,
  RouterPathName,
  RouterQueryKey,
} from "@/src/core/lib/constants";
import {
  useDeleteOrderItemQuery,
  useMutateOrderItem,
} from "../../hooks/useOrderItem";

export interface IBuyNowContainerProps {}

export default function BuyNowContainer(props: IBuyNowContainerProps) {
  useDeleteOrderItemQuery();
  const { mutate: mutateOrderItem, isSuccess: isSuccessMutateOrderItem } =
    useMutateOrderItem();

  const [shoppingSummary, setShoppingSummary] = useState({
    totalPrice: 0,
    subTotalPrice: 0,
  });

  const [buyNowItem, setBuyNowItem] = useState({
    quantity: 1,
    notes: "",
  });

  const { data: productByIdData, isLoading } = useQuery<IProducts>({
    queryKey: [ReactQueryKey.GetProductById],
    queryFn: () =>
      fetchProductById({
        id: parseInt(String(router.query[RouterQueryKey.ProductId])),
      }),
  });

  if (isLoading) {
    return <div />;
  }

  // buy now
  const handleSubstract = (data: number) => {
    setBuyNowItem((state) => (state = { ...state, quantity: data }));
  };
  const handleAdd = (data: number) => {
    setBuyNowItem((state) => (state = { ...state, quantity: data }));
  };
  const handleChangeNotes = (data: string) => {
    setBuyNowItem((state) => (state = { ...state, notes: data }));
  };

  // shopping summary
  useEffect(() => {
    setShoppingSummary({
      ...shoppingSummary,
      subTotalPrice: buyNowItem.quantity * productByIdData.price,
      totalPrice: buyNowItem.quantity * productByIdData.price,
    });
  }, [buyNowItem.quantity]);

  const router = useRouter();

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(PRODUCT_LINK);
  };

  const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutateOrderItem({
      orders: [
        {
          product_id: parseInt(String(router.query[RouterQueryKey.ProductId])),
          quantity: buyNowItem.quantity,
          notes: buyNowItem.notes,
        },
      ],
    });
  };

  useEffect(() => {
    if (isSuccessMutateOrderItem) {
      router.replace({
        pathname: RouterPathName.FillOrderDetail,
        query: {
          [RouterQueryKey.ProductId]: parseInt(
            String(router.query[RouterQueryKey.ProductId])
          ),
        },
      });
    }
  }, [isSuccessMutateOrderItem]);

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
                name={productByIdData.title}
                productSrc={productByIdData.image}
                price={thousandSeparator(productByIdData.price)}
                quantity={buyNowItem.quantity}
                onSubstract={handleSubstract}
                onAdd={handleAdd}
                onChangeNotes={handleChangeNotes}
              />
            </div>

            <ShoppingSummaryCardOrder
              quantity={buyNowItem.quantity}
              subTotalPrice={shoppingSummary.subTotalPrice}
              totalPrice={shoppingSummary.totalPrice}
              onCancel={handleClickCancel}
              onSubmit={handleClickSubmit}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
