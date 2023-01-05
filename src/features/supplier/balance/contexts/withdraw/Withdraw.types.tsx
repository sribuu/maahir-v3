type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface InitialStateType {
  notification: IWithdrawBalanceNotification;
  maximum_withdraw: number;
  statistic: IWithdrawBalanceStatistic[];
  withdraw_request_form: IWithdrawBalanceWithdraw;
}

// State Collection Types consist of:

export interface IWithdrawBalanceNotification {
  open: boolean;
  success: boolean;
}
export interface IWithdrawBalanceStatistic {
  name: string;
  price: string;
}

export interface IWithdrawBalanceWithdraw {
  able_to_withdraw: boolean;
  has_account_number: boolean;
  bank_name: string;
  account_number: string;
  name: string;
  balance: {
    value: string;
    error: string;
  };
}

export enum WithdrawBalanceActionEnum {
  SetMaximumWithdraw = "SetMaximumWithdraw",
  OpenSuccessNotification = "OpenSuccessNotification",
  CloseSuccessNotification = "CloseSuccessNotification",
  SetStatistic = "SetStatistic",
  SetWithdraw = "SetWithdraw",
  CheckBalanceWithdrawAbility = "CheckBalanceWithdrawAbility",
  InputBalance = "InputBalance",
}

// Action Collection Types
export type WithdrawBalanceActions =
  | WithdrawBalanceMaximumWithdrawActions
  | WithdrawBalanceNotificationActions
  | WithdrawBalanceStatisticActions
  | WithdrawBalanceWithdrawActions;

// Action Collection Types consist of:
// Maximum Withdraw
type WithdrawBalanceMaximumWithdrawPayload = {
  [WithdrawBalanceActionEnum.SetMaximumWithdraw]: number;
};

export type WithdrawBalanceMaximumWithdrawActions =
  ActionMap<WithdrawBalanceMaximumWithdrawPayload>[keyof ActionMap<WithdrawBalanceMaximumWithdrawPayload>];

// Notification
type WithdrawBalanceNotificationPayload = {
  [WithdrawBalanceActionEnum.OpenSuccessNotification]: undefined;
  [WithdrawBalanceActionEnum.CloseSuccessNotification]: undefined;
};

export type WithdrawBalanceNotificationActions =
  ActionMap<WithdrawBalanceNotificationPayload>[keyof ActionMap<WithdrawBalanceNotificationPayload>];

// Statistic
type WithdrawBalanceStatisticPayload = {
  [WithdrawBalanceActionEnum.SetStatistic]: IWithdrawBalanceStatistic[];
};

export type WithdrawBalanceStatisticActions =
  ActionMap<WithdrawBalanceStatisticPayload>[keyof ActionMap<WithdrawBalanceStatisticPayload>];

// Withdraw
type WithdrawBalanceWithdrawPayload = {
  [WithdrawBalanceActionEnum.SetWithdraw]: IWithdrawBalanceWithdraw;
  [WithdrawBalanceActionEnum.CheckBalanceWithdrawAbility]: number;
  [WithdrawBalanceActionEnum.InputBalance]: string;
};

export type WithdrawBalanceWithdrawActions =
  ActionMap<WithdrawBalanceWithdrawPayload>[keyof ActionMap<WithdrawBalanceWithdrawPayload>];
