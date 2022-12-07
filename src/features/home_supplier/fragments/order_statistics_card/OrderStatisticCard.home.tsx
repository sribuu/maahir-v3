import * as React from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import clsx from "clsx";
import OrderStatisticListHome from "../order_statistic_list/OrderStatisticList.home";
import { thousandSeparator } from "@/src/core/utils/formatters";
import { useUnauthorizedGetSupplierStatisticQuery } from "../../hooks/useSupplierStatistic";
import { useOrderStatisticList } from "../../hooks/useOrderStatisticList";

export interface IOrderStatisticsCardHomeProps {}

export default function OrderStatisticsCardHome(
  props: IOrderStatisticsCardHomeProps
) {
  const list = useOrderStatisticList();
  const unauthorized = useUnauthorizedGetSupplierStatisticQuery();
  //   const list = [
  //     {
  //       name: "BELUM DIPROSES",
  //       quantity: 7,
  //       price: 1000000,
  //     },
  //     {
  //       name: "DIKIRIM",
  //       quantity: 10,
  //       price: 1000000,
  //     },
  //     {
  //       name: "DALAM PENGEMASAN",
  //       quantity: 10,
  //       price: 1000000,
  //     },
  //     {
  //       name: "DITERIMA",
  //       quantity: 10,
  //       price: 1000000,
  //     },
  //   ];
  return (
    <CardComponent className={clsx("p-[1rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 justify-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
          {"Statistik Pesanan"}
        </p>

        <div
          className={clsx(
            "grid grid-cols-2 justify-start gap-y-[1.5rem] gap-x-[2rem]",
            "w-full"
          )}
        >
          {list.map((item, index) => (
            <OrderStatisticListHome
              key={index}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </CardComponent>
  );
}
