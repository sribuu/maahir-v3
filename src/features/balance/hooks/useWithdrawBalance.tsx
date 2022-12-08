import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  IWithdrawBalanceErrorResponse,
  IWithdrawBalanceRequest,
  IWithdrawBalanceSuccessResponse,
} from "../models";
import { fetchWithdrawBalance } from "../services";
import { WithdrawBalanceContext } from "../contexts/withdraw/Withdraw.context";
import { WithdrawBalanceReactQueryKey } from "../constants";

export const useWithdrawBalanceRequestWithdraw = () => {
  const { state } = useContext(WithdrawBalanceContext);
  const mutation = useMutation<
    IWithdrawBalanceSuccessResponse,
    IWithdrawBalanceErrorResponse
  >([WithdrawBalanceReactQueryKey.RequestWithdrawBalance], () => {
    const payload: IWithdrawBalanceRequest = {
      balance: parseInt(state.withdraw.balance.value),
    };
    return fetchWithdrawBalance(payload);
  });

  return mutation;
};
