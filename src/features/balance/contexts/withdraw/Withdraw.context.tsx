import React, { createContext, useReducer, Dispatch } from "react";
import { WithdrawBalanceActions, InitialStateType } from "./Withdraw.types";
import {
  withdrawBalanceMaximumWithdrawReducer,
  withdrawBalanceNotificationReducer,
  withdrawBalanceStatisticReducer,
  withdrawBalanceWithdrawReducer,
} from "./Withdraw.reducers";

const initialState: InitialStateType = {
  maximum_withdraw: 0,
  notification: {
    open: false,
    success: false,
  },
  statistic: [],
  withdraw_request_form: {
    balance: {
      value: "0",
      error: "",
    },
    able_to_withdraw: false,
    bank_name: "",
    account_number: "",
    name: "",
    has_account_number: false,
  },
};

const WithdrawBalanceContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<WithdrawBalanceActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    maximum_withdraw,
    notification,
    statistic,
    withdraw_request_form,
  }: InitialStateType,
  action: WithdrawBalanceActions
) => ({
  maximum_withdraw: withdrawBalanceMaximumWithdrawReducer(
    maximum_withdraw,
    action
  ),
  notification: withdrawBalanceNotificationReducer(notification, action),
  statistic: withdrawBalanceStatisticReducer(statistic, action),
  withdraw_request_form: withdrawBalanceWithdrawReducer(
    withdraw_request_form,
    action
  ),
});

const WithdrawBalanceProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <WithdrawBalanceContext.Provider value={{ state, dispatch }}>
      {props.children}
    </WithdrawBalanceContext.Provider>
  );
};

export { WithdrawBalanceProvider, WithdrawBalanceContext };
