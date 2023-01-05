import { useContext } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import BalanceListHome from "../balance_list/BalanceList.home";
import { useSupplierHomeGetSupplierStatistic } from "../../hooks/useSupplierStatistic";
import { SupplierHomeContext } from "../../contexts/HomeSupplier.context";

export interface IBalanceCardHomeProps {}

export default function BalanceCardHome(props: IBalanceCardHomeProps) {
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
          {"Saldo Anda"}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 justify-start gap-y-[1.5rem]",
            "w-full"
          )}
        >
          {state.balance.map((item, index) => (
            <BalanceListHome key={index} name={item.name} price={item.price} />
          ))}
        </div>
      </div>
    </CardComponent>
  );
}
