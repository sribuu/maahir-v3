import { useContext } from "react";
import clsx from "clsx";
import CardComponent from "@/src/core/ui/components/card/Card.component";
import BalanceListBalance from "../balance_list/BalanceList.balance";

import { useWithdrawBalanceGetBalanceStatistic } from "../../hooks/useGetBalanceStatistic";
import { WithdrawBalanceContext } from "../../contexts/withdraw/Withdraw.context";

export interface IBalanceCardBalanceProps {}

export default function BalanceCardBalance(props: IBalanceCardBalanceProps) {
  const { isLoading: isLoadingGetBalanceStatistic } =
    useWithdrawBalanceGetBalanceStatistic();
  const { state } = useContext(WithdrawBalanceContext);

  if (isLoadingGetBalanceStatistic) {
    return <div />;
  }

  return (
    <CardComponent className={clsx("p-[1rem]")}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[1.25rem] text-dark-charcoal font-bold")}>
          {"Saldo Anda"}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem] ",
            "w-full"
          )}
        >
          {state.statistic.map((item, index) => (
            <BalanceListBalance
              key={index}
              price={item.price}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </CardComponent>
  );
}
