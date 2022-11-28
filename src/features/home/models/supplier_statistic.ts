export interface ISupplierStatisticSuccessResponse {
  statistic: {
    PAYMENT_COMPLETED: {
      //   value: 200000;
      //   quantity: 6;
      value: number;
      quantity: number;
    };
    PROCESSING: {
      //   value: 120000;
      //   quantity: 3;
      value: number;
      quantity: number;
    };
    ON_DELIVERY: {
      //   value: 2000000;
      //   quantity: 1;
      value: number;
      quantity: number;
    };
    ORDER_COMPLETED: {
      //   value: 0;
      //   quantity: 0;
      value: number;
      quantity: number;
    };
  };
  balance: {
    // available_balance: 0;
    // holding_balance: 2320000;
    // pending_withdrawal: 0;
    // withdrawn_balance: 0;
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
