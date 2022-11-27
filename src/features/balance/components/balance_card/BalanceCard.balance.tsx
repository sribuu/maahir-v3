import * as React from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IBalanceCardBalanceProps {}

export default function BalanceCardBalance(props: IBalanceCardBalanceProps) {
  const list = [
    {
      name: "SALDO TERSEDIA",
      amount: thousandSeparator(10000000),
      color: "caribbean-green",
      icon: "/icons/action-money-green.svg",
    },
    {
      name: "SALDO TERTAHAN",
      amount: thousandSeparator(10000000),
      color: "tart-orange",
      icon: "/icons/system-restore-red.svg",
    },
  ];

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
            <div
              key={index}
              className={clsx(
                "grid grid-cols-1 justify-start",
                "p-[1rem] w-full rounded-[1rem]",
                "border border-bright-gray"
              )}
            >
              <div
                className={clsx("flex justify-between items-center", "w-full")}
              >
                <div
                  className={clsx(
                    "grid grid-cols-1 justify-start gap-y-[0.125rem]"
                  )}
                >
                  <p
                    className={clsx(
                      "text-[0.875rem] text-independence font-regular"
                    )}
                  >
                    {item.name}
                  </p>
                  <p
                    className={clsx(
                      "text-[1.25rem] text-dark-charcoal font-bold"
                    )}
                  >
                    {item.amount}
                  </p>
                </div>
                {/* circle */}
                <div
                  className={clsx(
                    "flex justify-center items-center",
                    "w-[56px] h-[56px] rounded-[50%]",
                    `bg-${item.color} bg-opacity-10`,
                    "box-border"
                  )}
                >
                  <img src={item.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardComponent>
  );
}
