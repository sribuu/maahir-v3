import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  IGetSupplierProfileErrorResponse,
  IGetSupplierProfileSuccessResponse,
} from "../../profile/models";
import { fetchGetSupplierProfile } from "../../profile/services";
import { WithdrawBalanceReactQueryKey } from "../constants";
import { WithdrawBalanceContext } from "../contexts/withdraw/Withdraw.context";
import { WithdrawBalanceActionEnum } from "../contexts/withdraw/Withdraw.types";

// export const useCheckAccountNumber = () =>
//   useGetSupplierProfileQuery()?.data?.detail?.is_lock_bank;

export const useWithdrawBalanceGetSupplierProfile = () => {
  const { state, dispatch } = useContext(WithdrawBalanceContext);
  const query = useQuery<
    IGetSupplierProfileSuccessResponse,
    IGetSupplierProfileErrorResponse
  >([WithdrawBalanceReactQueryKey.GetSupplierProfile], () => {
    return fetchGetSupplierProfile();
  });

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: WithdrawBalanceActionEnum.SetWithdraw,
        payload: {
          ...state.withdraw,
          able_to_withdraw: query.data.detail.is_lock_bank,
          bank_name: query.data.detail.bank_name,
          account_number: query.data.detail.bank_account,
          name: query.data.name,
        },
      });
    }
  }, [query.isSuccess]);

  return query;
};
