import { BalanceList } from "../../home/models";
import { useGetSupplierStatisticQuery } from "./useSupplierStatistic";

export const useBalanceList: () => BalanceList[] = () => {
  const data = useGetSupplierStatisticQuery().data;
  return [
    {
      name: "SALDO TERSEDIA",
      price: data?.balance.available_balance,
    },
    {
      name: "SALDO TERTAHAN",
      price: data?.balance.holding_balance,
    },
  ];
};
