import {
  IWithdrawBalanceStatistic,
  IWithdrawBalanceWithdraw,
  WithdrawBalanceActionEnum,
  WithdrawBalanceActions,
} from "./Withdraw.types";

// ViralProducts
export const withdrawBalanceStatisticReducer = (
  state: IWithdrawBalanceStatistic[],
  action: WithdrawBalanceActions
) => {
  switch (action.type) {
    case WithdrawBalanceActionEnum.SetStatistic:
      return action.payload;
    default:
      return state;
  }
};

export const withdrawBalanceWithdrawReducer = (
  state: IWithdrawBalanceWithdraw,
  action: WithdrawBalanceActions
) => {
  switch (action.type) {
    case WithdrawBalanceActionEnum.SetWithdraw:
      return action.payload;
    case WithdrawBalanceActionEnum.WithdrawBalance:
      return {
        ...state,
        balance: {
          ...state.balance,
          value: action.payload,
        },
      };
    default:
      return state;
  }
};
