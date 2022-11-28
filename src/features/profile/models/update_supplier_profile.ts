export interface IUpdateSupplierProfileRequest {
  // "name": "Feril B",
  // "bank_account": "123456",
  // "bank_id": 78,
  // "category_id": 76,
  // "bank_name_holder": "Feril"
  name: string;
  bank_account: string;
  bank_id: number;
  // category id darimana?
  category_id: number;
  bank_name_holder: string;
}

export interface IUpdateSupplierProfileSuccessResponse {
  message: string;
}

export interface IUpdateSupplierProfileErrorResponse {
  error_code: string;
  message: string;
}
