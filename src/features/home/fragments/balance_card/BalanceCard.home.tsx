import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import { thousandSeparator } from "@/src/core/utils/formatters";
import BalanceListHome from "../balance_list/BalanceList.home";
import { useBalanceList } from "../../hooks/useBalanceList";

export interface IBalanceCardHomeProps {}

export default function BalanceCardHome(props: IBalanceCardHomeProps) {
  const list = useBalanceList();
  //   const list = [
  //     {
  //       name: "SALDO TERSEDIA",
  //       quantity: 10000000,
  //     },
  //     {
  //       name: "SALDO TERTAHAN",
  //       quantity: 10000000,
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
          {"Saldo Anda"}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 justify-start gap-y-[1.5rem]",
            "w-full"
          )}
        >
          {list.map((item, index) => (
            <BalanceListHome key={index} name={item.name} price={item.price} />
          ))}
        </div>
      </div>
    </CardComponent>
  );
}
