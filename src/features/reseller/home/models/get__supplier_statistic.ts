export interface ISupplierStatisticSuccessResponse {
  statistic: {
    PAYMENT_COMPLETED: {
      value: number;
      quantity: number;
    };
    PROCESSING: {
      value: number;
      quantity: number;
    };
    ON_DELIVERY: {
      value: number;
      quantity: number;
    };
    ORDER_COMPLETED: {
      value: number;
      quantity: number;
    };
  };
  balance: {
    available_balance: number;
    holding_balance: number;
    pending_withdrawal: number;
    withdrawn_balance: number;
  };
}

export interface ISupplierStatisticErrorResponse {
  error_code: string;
  message: string;
}
