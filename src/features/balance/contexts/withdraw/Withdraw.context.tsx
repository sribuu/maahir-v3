import React, { createContext, useReducer, Dispatch } from "react";
import { WithdrawBalanceActions, InitialStateType } from "./Withdraw.types";
import {
  withdrawBalanceStatisticReducer,
  withdrawBalanceWithdrawReducer,
} from "./Withdraw.reducers";

const initialState: InitialStateType = {
  statistic: [],
  withdraw: {
    balance: {
      value: "",
      error: "",
    },
    able_to_withdraw: false,
    bank_name: "",
    account_number: "",
    name: "",
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
  { statistic, withdraw }: InitialStateType,
  action: WithdrawBalanceActions
) => ({
  statistic: withdrawBalanceStatisticReducer(statistic, action),
  withdraw: withdrawBalanceWithdrawReducer(withdraw, action),
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
