import * as React from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import clsx from "clsx";
import { thousandSeparator } from "@/src/core/utils/formatters";

export interface IOrderStatisticsCardHomeProps {}

export default function OrderStatisticsCardHome(
  props: IOrderStatisticsCardHomeProps
) {
  const list = [
    {
      name: "BELUM DIPROSES",
      amount: 7,
      color: "caribbean-green",
      icon: "/icons/action-money-green.svg",
      price: thousandSeparator(1000000),
    },
    {
      name: "DIKIRIM",
      amount: 10,
      color: "tart-orange",
      icon: "/icons/system-restore-red.svg",
      price: thousandSeparator(1000000),
    },
    {
      name: "DALAM PENGEMASAN",
      amount: 10,
      color: "tart-orange",
      icon: "/icons/system-restore-red.svg",
      price: thousandSeparator(1000000),
    },
    {
      name: "DITERIMA",
      amount: 10,
      color: "tart-orange",
      icon: "/icons/system-restore-red.svg",
      price: thousandSeparator(1000000),
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
          {"Statistik Pesanan"}
        </p>

        <div
          className={clsx(
            "grid grid-cols-2 justify-start gap-y-[1.5rem]",
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
                      "text-[0.875rem] text-charleston-green font-regular"
                    )}
                  >
                    {item.name}
                  </p>
                  <p
                    className={clsx("text-[1rem] text-dark-charcoal font-bold")}
                  >
                    {`${item.amount} pesanan`}
                  </p>
                  <p
                    className={clsx(
                      "text-[0.875rem] text-taupe-gray font-medium"
                    )}
                  >
                    {item.price}
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
