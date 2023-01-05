export interface IGetSupplierProfileRequest {}
export interface IGetSupplierProfileSuccessResponse {
  id: number;
  detail: {
    bank_name_holder: string;
    bank_account: string;
    is_lock_bank: boolean;
    category_id: number;
    category_name: string;
    bank_id: number;
    bank_name: string;
  };
  name_initial: string;
  name: string;
  email: string;
  is_verified: boolean;
}

export interface IGetSupplierProfileErrorResponse {
  error_code: string;
  message: string;
}
