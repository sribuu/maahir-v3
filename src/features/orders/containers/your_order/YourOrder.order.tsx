import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import MainLayout from "@/src/core/ui/layouts/main/Main.layout";
import OrderProductCardComponent from "@/src/core/ui/components/order_product_card/OrderProductCard.component";
import OrderSummaryCardComponent from "@/src/core/ui/components/order_summary_card/OrderSummaryCard.component";
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

export interface IYourOrderContainerProps {}

export default function YourOrderContainer(props: IYourOrderContainerProps) {
  useDeleteOrderItemQuery();
  const { mutate: mutateOrderItem, isSuccess: isSuccessMutateOrderItem } =
    useMutateOrderItem();

  const [state, setState] = useState({
    quantity: 1,
    totalPrice: "Rp0",
    subTotalPrice: "Rp0",
  });
  const router = useRouter();
  const { id } = router.query;

  const { data: productByIdData, isLoading } = useQuery<IProducts>({
    queryKey: [ReactQueryKey.GetProductById],
    queryFn: () =>
      fetchProductById(
        parseInt(String(router.query[RouterQueryKey.ProductId]))
      ),
  });

  if (isLoading) {
    return <div />;
  }

  const handleSubstract = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState((state) => (state = { ...state, quantity: state.quantity - 1 }));
  };
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState((state) => (state = { ...state, quantity: state.quantity + 1 }));
  };

  useEffect(() => {
    setState({
      ...state,
      subTotalPrice: thousandSeparator(state.quantity * productByIdData.price),
      totalPrice: thousandSeparator(state.quantity * productByIdData.price),
    });
  }, [state.quantity]);

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(PRODUCT_LINK);
  };

  const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutateOrderItem({
      orders: [
        {
          product_id: parseInt(String(router.query[RouterQueryKey.ProductId])),
          quantity: state.quantity,
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
            "gap-y-[1.5rem] max-w-[37.5rem] w-full"
          )}
        >
          <p
            className={clsx(
              "text-[1.75rem] font-bold",
              "text-charleston-green"
            )}
          >
            {"Pesanan Kamu"}
          </p>

          <OrderProductCardComponent
            name={productByIdData.title}
            productSrc={productByIdData.image}
            minPrice={thousandSeparator(productByIdData.retail_price_min)}
            maxPrice={thousandSeparator(productByIdData.retail_price_max)}
            price={thousandSeparator(productByIdData.price)}
            quantity={state.quantity}
            onSubstract={handleSubstract}
            onAdd={handleAdd}
          />

          <OrderSummaryCardComponent
            quantity={state.quantity}
            subTotalPrice={state.subTotalPrice}
            totalPrice={state.totalPrice}
            onCancel={handleClickCancel}
            onSubmit={handleClickSubmit}
          />
        </div>
      </div>
    </MainLayout>
  );
}
