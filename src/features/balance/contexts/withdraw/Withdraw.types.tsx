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
  statistic: IWithdrawBalanceStatistic[];
  withdraw: IWithdrawBalanceWithdraw;
}

// State Collection Types consist of:
export interface IWithdrawBalanceStatistic {
  name: string;
  price: string;
}

export interface IWithdrawBalanceWithdraw {
  able_to_withdraw: boolean;
  bank_name: string;
  account_number: string;
  name: string;
  balance: {
    value: string;
    error: string;
  };
}

export enum WithdrawBalanceActionEnum {
  SetStatistic = "SetStatistic",
  SetWithdraw = "SetWithdraw",
  WithdrawBalance = "WithdrawBalance",
}

// Action Collection Types
export type WithdrawBalanceActions =
  | WithdrawBalanceStatisticActions
  | WithdrawBalanceWithdrawActions;

// Action Collection Types consist of:
// Viral Products
type WithdrawBalanceStatisticPayload = {
  [WithdrawBalanceActionEnum.SetStatistic]: IWithdrawBalanceStatistic[];
};

export type WithdrawBalanceStatisticActions =
  ActionMap<WithdrawBalanceStatisticPayload>[keyof ActionMap<WithdrawBalanceStatisticPayload>];

// Withdraw
type WithdrawBalanceWithdrawPayload = {
  [WithdrawBalanceActionEnum.SetWithdraw]: IWithdrawBalanceWithdraw;
  [WithdrawBalanceActionEnum.WithdrawBalance]: string;
};

export type WithdrawBalanceWithdrawActions =
  ActionMap<WithdrawBalanceWithdrawPayload>[keyof ActionMap<WithdrawBalanceWithdrawPayload>];
