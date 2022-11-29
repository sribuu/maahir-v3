export interface IUpdateSupplierProfileRequest {
  name: string;
  bank_account: string;
  bank_id: number;
  bank_name_holder: string;
}

export interface IUpdateSupplierProfileSuccessResponse {
  message: string;
}

export interface IUpdateSupplierProfileErrorResponse {
  error_code: string;
  message: string;
}
