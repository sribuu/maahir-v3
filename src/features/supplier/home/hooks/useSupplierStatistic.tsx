import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ISupplierStatisticErrorResponse,
  ISupplierStatisticSuccessResponse,
} from "../../../reseller/home/models";
import { fetchSupplierStatistic } from "@/src/features/supplier/home/services";
import { SupplierHomeReactQueryKey } from "../constants";
import { SupplierHomeContext } from "../contexts/HomeSupplier.context";
import { SupplierHomeActionEnum } from "../contexts/HomeSupplier.types";
import { thousandSeparator } from "@/src/core/utils/formatters";

export const useSupplierHomeGetSupplierStatistic = () => {
  const { dispatch } = useContext(SupplierHomeContext);
  const query = useQuery<
    ISupplierStatisticSuccessResponse,
    ISupplierStatisticErrorResponse
  >(
    [SupplierHomeReactQueryKey.GetSupplierStatistic],
    () => {
      return fetchSupplierStatistic();
    },
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: SupplierHomeActionEnum.SetBalance,
        payload: [
          {
            name: "SALDO TERSEDIA",
            price: thousandSeparator(query.data?.balance.available_balance),
          },
          {
            name: "SALDO TERTAHAN",
            price: thousandSeparator(query.data?.balance.holding_balance),
          },
        ],
      });
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: SupplierHomeActionEnum.SetOrder,
        payload: [
          {
            name: "BELUM DIPROSES",
            quantity: `${query.data?.statistic.PAYMENT_COMPLETED.quantity} pesanan`,
            price: thousandSeparator(
              query.data?.statistic.PAYMENT_COMPLETED.value
            ),
          },
          {
            name: "DIKIRIM",
            quantity: `${query.data?.statistic.ON_DELIVERY.quantity} pesanan`,
            price: thousandSeparator(query.data?.statistic.ON_DELIVERY.value),
          },
          {
            name: "DALAM PENGEMASAN",
            quantity: `${query.data?.statistic.PROCESSING.quantity} pesanan`,
            price: thousandSeparator(query.data?.statistic.PROCESSING.value),
          },
          {
            name: "DITERIMA",
            quantity: `${query.data?.statistic.ORDER_COMPLETED.quantity} pesanan`,
            price: thousandSeparator(
              query.data?.statistic.ORDER_COMPLETED.value
            ),
          },
        ],
      });
    }
  }, [query.isSuccess]);
  return query;
};
