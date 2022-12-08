import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  IWithdrawBalanceErrorResponse,
  IWithdrawBalanceRequest,
  IWithdrawBalanceSuccessResponse,
} from "../models";
import { fetchWithdrawBalance } from "../services";
import { WithdrawBalanceContext } from "../contexts/withdraw/Withdraw.context";
import { WithdrawBalanceReactQueryKey } from "../constants";
import { WithdrawBalanceActionEnum } from "../contexts/withdraw/Withdraw.types";

export const useWithdrawBalanceRequestWithdraw = () => {
  const { state, dispatch } = useContext(WithdrawBalanceContext);
  const mutation = useMutation<
    IWithdrawBalanceSuccessResponse,
    IWithdrawBalanceErrorResponse
  >([WithdrawBalanceReactQueryKey.RequestWithdrawBalance], () => {
    const payload: IWithdrawBalanceRequest = {
      balance: parseInt(state.withdraw_request_form.balance.value),
    };
    return fetchWithdrawBalance(payload);
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch({
        type: WithdrawBalanceActionEnum.OpenSuccessNotification,
      });
    }
  }, [mutation.isSuccess]);

  return mutation;
};
