export interface IWithdrawBalanceRequest {
  balance: number;
}

export interface IWithdrawBalanceSuccessResponse {
  message: string;
}

export interface IWithdrawBalanceErrorResponse {
  error_code: string;
  message: string;
}
