import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ISupplierStatisticErrorResponse,
  ISupplierStatisticSuccessResponse,
} from "../../home/models";
import { fetchSupplierStatistic } from "@/src/features/home_supplier/services";
import { WithdrawBalanceReactQueryKey } from "../constants";
import { WithdrawBalanceContext } from "../contexts/withdraw/Withdraw.context";
import { WithdrawBalanceActionEnum } from "../contexts/withdraw/Withdraw.types";
import { thousandSeparator } from "@/src/core/utils/formatters";

export const useWithdrawBalanceGetBalanceStatistic = () => {
  const { dispatch } = useContext(WithdrawBalanceContext);
  const query = useQuery<
    ISupplierStatisticSuccessResponse,
    ISupplierStatisticErrorResponse
  >(
    [WithdrawBalanceReactQueryKey.GetSupplierStatistic],
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
        type: WithdrawBalanceActionEnum.SetStatistic,
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

  return query;
};
