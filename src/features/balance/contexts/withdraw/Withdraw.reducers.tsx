import { numberFormatters } from "@/src/core/utils/formatters";
import {
  IWithdrawBalanceNotification,
  IWithdrawBalanceStatistic,
  IWithdrawBalanceWithdraw,
  WithdrawBalanceActionEnum,
  WithdrawBalanceActions,
} from "./Withdraw.types";

// Maximum Withdraw
export const withdrawBalanceMaximumWithdrawReducer = (
  state: number,
  action: WithdrawBalanceActions
) => {
  switch (action.type) {
    case WithdrawBalanceActionEnum.SetMaximumWithdraw:
      return action.payload;
    default:
      return state;
  }
};

// Notification
export const withdrawBalanceNotificationReducer = (
  state: IWithdrawBalanceNotification,
  action: WithdrawBalanceActions
) => {
  switch (action.type) {
    case WithdrawBalanceActionEnum.OpenSuccessNotification:
      return {
        ...state,
        open: true,
      };
    case WithdrawBalanceActionEnum.CloseSuccessNotification:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

// Statistic
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

// Withdraw
export const withdrawBalanceWithdrawReducer = (
  state: IWithdrawBalanceWithdraw,
  action: WithdrawBalanceActions
) => {
  switch (action.type) {
    case WithdrawBalanceActionEnum.SetWithdraw:
      return action.payload;

    case WithdrawBalanceActionEnum.InputBalance:
      return {
        ...state,
        balance: {
          ...state.balance,
          value: numberFormatters.indonesianThousandSeparator(
            numberFormatters.replaceInitialZeroWithEmptyString(
              numberFormatters.replaceCharWithEmptyString(action.payload)
            )
          ),
        },
      };
    case WithdrawBalanceActionEnum.CheckBalanceWithdrawAbility:
      return {
        ...state,
        balance: {
          ...state.balance,
          error:
            parseInt(
              numberFormatters.indonesianMoneyToNumber(state.balance.value)
            ) > action.payload
              ? "Jumlah melebihi saldo aktif Anda"
              : "",
        },
      };
    default:
      return state;
  }
};
