import { useContext } from "react";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import clsx from "clsx";
import OrderStatisticListHome from "../order_statistic_list/OrderStatisticList.home";
import { useSupplierHomeGetSupplierStatistic } from "../../hooks/useSupplierStatistic";
import { SupplierHomeContext } from "../../contexts/HomeSupplier.context";

export interface IOrderStatisticsCardHomeProps {}

export default function OrderStatisticsCardHome(
  props: IOrderStatisticsCardHomeProps
) {
  const { state } = useContext(SupplierHomeContext);
  const { isLoading: isLoadingGetSupplierStatistic } =
    useSupplierHomeGetSupplierStatistic();

  if (isLoadingGetSupplierStatistic) {
    return <div></div>;
  }

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
          {state.order.map((item, index) => (
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
