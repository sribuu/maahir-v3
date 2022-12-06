import * as React from "react";
import SupplierLayout from "@/src/core/ui/layouts/supplier/Supplier.layout";
import clsx from "clsx";
import BalanceCardHome from "../../fragments/balance_card/BalanceCard.home";
import OrderStatisticsCardHome from "../../fragments/order_statistics_card/OrderStatisticCard.home";
import UnprocessedOrderCardHome from "../../fragments/unprocessed_order_card/UnprocessedOrderCard.home";
import { useGetSupplierStatisticQuery } from "../../../home/hooks/useSupplierStatistic";
export interface ISupplierHomeContainerProps {}

export default function SupplierHomeContainer(
  props: ISupplierHomeContainerProps
) {
  const header = {
    name: "Beranda",
    description: "Cek statistik saldo dan pesanan kamu disini",
  };
  return (
    <SupplierLayout header={header}>
      <div className={clsx("grid grid-cols-1 gap-y-[1.75rem]", "w-full")}>
        <div
          className={clsx("grid grid-cols-[400px_1fr] gap-x-[2rem]", "w-full")}
        >
          <BalanceCardHome />
          <OrderStatisticsCardHome />
        </div>
        <UnprocessedOrderCardHome />
      </div>
    </SupplierLayout>
  );
}
