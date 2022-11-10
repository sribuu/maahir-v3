import { useGetOrderById } from "@/src/core/hooks/useGetOrderById";
import * as React from "react";

export interface IOrdersContainerProps {}

export default function OrdersContainer(props: IOrdersContainerProps) {
  const {
    isLoading: isLoadingOrder,
    error: errorOrder,
    data: order,
  } = useGetOrderById({ order_code: "aaa" });
  return (
    <div>
      <div></div>
    </div>
  );
}
