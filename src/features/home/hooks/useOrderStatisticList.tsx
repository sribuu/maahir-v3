import { OrderStatisticList } from "../models";
import { useGetSupplierStatisticQuery } from "./useSupplierStatistic";

export const useOrderStatisticList: () => OrderStatisticList[] = () => {
  const data = useGetSupplierStatisticQuery().data;
  return [
    {
      name: "BELUM DIPROSES",
      quantity: data?.statistic.PAYMENT_COMPLETED.quantity,
      price: data?.statistic.PAYMENT_COMPLETED.value,
    },
    {
      name: "DIKIRIM",
      quantity: data?.statistic.ON_DELIVERY.quantity,
      price: data?.statistic.ON_DELIVERY.value,
    },
    {
      name: "DALAM PENGEMASAN",
      quantity: data?.statistic.PROCESSING.quantity,
      price: data?.statistic.PROCESSING.value,
    },
    {
      name: "DITERIMA",
      quantity: data?.statistic.ORDER_COMPLETED.quantity,
      price: data?.statistic.ORDER_COMPLETED.value,
    },
  ];
};
