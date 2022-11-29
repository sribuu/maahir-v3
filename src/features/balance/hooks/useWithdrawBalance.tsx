import { useEffect, useState } from "react";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { useMutation } from "@tanstack/react-query";
import {
  IWithdrawBalanceErrorResponse,
  IWithdrawBalanceRequest,
  IWithdrawBalanceSuccessResponse,
} from "../models";
import { fetchWithdrawBalance } from "../services";

export const useMutateWithdrawBalanceQuery = () =>
  useMutation<
    IWithdrawBalanceSuccessResponse,
    IWithdrawBalanceErrorResponse,
    IWithdrawBalanceRequest
  >([ReactQueryKey.PostWithdrawBalance], (data: IWithdrawBalanceRequest) =>
    fetchWithdrawBalance(data)
  );

export const useBalanceAmount = () => {
  const [balance, setBalance] = useState(0);

  return {
    balance,
    setBalance,
  };
};
